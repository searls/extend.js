makeExtender = (top) ->
  (name, values...) ->
    ancestors = name.split(/[./\\]/g)
    leaf = ancestors.pop()
    parent = resolveAncestors(ancestors, top)

    verifyDistinctness(name, values, parent[leaf])

    if isExtensible(parent[leaf], values)
      _(parent[leaf]).extend(values...)
    else if arguments.length > 1
      parent[leaf] = values.pop();
    parent[leaf]

isExtensible = (existing, values) ->
  existing? && !_(values).any(_.isFunction) && !_(existing).isFunction()

resolveAncestors = (ancestors, top) ->
  _(ancestors).reduce (ancestor, child) ->
    ancestor[child] ||= {}
  , top

verifyDistinctness = (name, values, existing) ->
  if _(existing).isFunction() && _(values).any((v) -> existing != v)
    throw "Cannot override \"#{name}\", because it is already defined as a function."


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

