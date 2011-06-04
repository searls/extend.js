(function(_) {
	var makeExtender = function(top) {
		return function(name,value) {
			var ancestors = name.split('.'),
					leaf = ancestors.pop(),
					parent = resolveAncestors(ancestors,top);

			verifyDistinctness(name,value,parent[leaf]);

			return isExtensible(parent[leaf],value) ? _(parent[leaf]).extend(value) : parent[leaf] = value;
		};
	};

	var isExtensible = function(existing,value) {
		return existing && !_(value).isFunction() && !_(existing).isFunction();
	};
	
	var resolveAncestors = function(ancestors,top) {
		return _(ancestors).reduce(function(ancestor,child) {
			ancestor[child] = ancestor[child] || {};
			return ancestor[child];
		},top);
	};
	
	var verifyDistinctness = function(name,value,existing) {
		if(_(existing).isFunction() && existing !== value) {
			throw 'Cannot define a new function "'+name+'", because one is already defined.';
		}
	};
	
	var originalExtend = window.extend;

	window.extend = makeExtender(window);
	
	window.extend.myNamespace = function(namespace) {
		namespace.extend = makeExtender(namespace);
	};
	
	window.extend.noConflict = function() {
		var ourExtend = window.extend;
		window.extend = originalExtend;
		return ourExtend;
	};
})(_);