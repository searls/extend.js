makeExtender = (top) ->
  (name, value) ->
    ancestors = name.split(/[./\\]/g)
    leaf = ancestors.pop()
    parent = resolveAncestors(ancestors, top)

    verifyDistinctness(name, value, parent[leaf])

    if isExtensible(parent[leaf], value)
      _(parent[leaf]).extend(value)
    else if arguments.length > 1
      parent[leaf] = value;
    parent[leaf]

isExtensible = (existing, value) ->
  existing? && !_(value).isFunction() && !_(existing).isFunction()

resolveAncestors = (ancestors, top) ->
  _(ancestors).reduce (ancestor, child) ->
    ancestor[child] ||= {}
  , top

verifyDistinctness = (name, value, existing) ->
  if _(existing).isFunction() && value? && existing != value
    throw "Cannot define a new function \"#{name}\", because one is already defined."


#nab whatever used to own window.extend
originalExtend = window.extend

#overwrite it with our extend
window.extend = makeExtender(window)

#sprinkle on utility functions
window.extend.myNamespace = (namespace) -> namespace.extend = makeExtender(namespace)

window.extend.noConflict = ->
  ourExtend = window.extend
  window.extend = originalExtend
  ourExtend

