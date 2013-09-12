makeExtender = (top) ->
  (name, values...) ->
    ancestors = name.split(/[./\\]/g)
    leaf = ancestors.pop()
    parent = resolveAncestors(ancestors, top)


    if _(parent[leaf]).isEmpty() and !_(parent[leaf]).isFunction()
      parent[leaf] = _.extend(values...)
    else
      _(parent[leaf]).extend(values...)
    parent[leaf]

resolveAncestors = (ancestors, top) ->
  _(ancestors).reduce (ancestor, child) ->
    ancestor[child] ||= {}
  , top

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
