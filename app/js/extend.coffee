_ = @_

makeExtender = (top) ->
  (name, values...) ->
    ancestors = name.split(/[./\\]/g)
    leaf = ancestors.pop()
    parent = resolveAncestors(ancestors, top)

    if preserveLeaf(parent[leaf])
      _(parent[leaf]).extend(values...)
    else
      parent[leaf] = _.extend(values...)

resolveAncestors = (ancestors, top) ->
  _(ancestors).reduce (ancestor, child) ->
    ancestor[child] ||= {}
  , top

preserveLeaf = (leaf) ->
 _(leaf).isFunction() or !_(leaf).isEmpty()

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
