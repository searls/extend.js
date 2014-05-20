root = this

_ = root._

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

originalExtend = root.extend
root.extend = makeExtender(window)

root.extend.myNamespace = (namespace) -> namespace.extend = makeExtender(namespace)
root.extend.noConflict = (dependencies = {}) ->
  _ = dependencies._ if dependencies._?

  ourExtend = root.extend
  root.extend = originalExtend
  ourExtend
