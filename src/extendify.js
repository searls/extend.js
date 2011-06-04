(function(_) {
	window.extend = function(name,value) {
		var ancestors = name.split('.');
		var leaf = ancestors.pop();
		var parent = _(ancestors).reduce(function(ancestor,child) {
			return ancestor[child] = ancestor[child] || {};
		},window);

		if(_(parent[leaf]).isFunction() && parent[leaf] !== value) {
			throw 'Cannot define a new function "'+name+'", because one is already defined.';
		}
		return parent[leaf] = value;
		
	};
})(_);