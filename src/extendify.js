(function(_) {
	var originalExtend = window.extend;
	
	window.extend = function(name,value) {
		var ancestors = name.split('.');
		var leaf = ancestors.pop();
		var parent = resolveAncestors(ancestors);

		verifyDistinctness(name,value,parent[leaf]);
		
		return isExtensible(parent[leaf],value) ? _(parent[leaf]).extend(value) : parent[leaf] = value;
	};
	
	var isExtensible = function(existing,value) {
		return existing && !_(value).isFunction() && !_(existing).isFunction();
	};
	
	var resolveAncestors = function(ancestors) {
		return _(ancestors).reduce(function(ancestor,child) {
			return ancestor[child] = ancestor[child] || {};
		},window);
	};
	
	var verifyDistinctness = function(name,value,existing) {
		if(_(existing).isFunction() && existing !== value) {
			throw 'Cannot define a new function "'+name+'", because one is already defined.';
		}
	};
	
	window.extend.noConflict = function() {
		var ourExtend = window.extend;
		window.extend = originalExtend;
		return ourExtend;
	};
})(_);