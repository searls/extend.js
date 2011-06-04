window.context = window.describe;

describe(".extend", function() {
	describe("the names you might specify", function() {
		var value = {};
	  context("passed a single identifier", function() {
			beforeEach(function() {
			  extend('panda',value);
			});
	    it("creates a single object on the window", function() {
	      expect(window.panda).toBe(value);
	    });
	  });
		context("passed period-delimited identifiers", function() {
			beforeEach(function() {
			  extend('code.retreat',value);
			});
		  it("creates an object for each identifier", function() {
		    expect(window.code.retreat).toBe(value);
		  });
		});
		context("passed a humorously deep number of identifiers", function() {
		  beforeEach(function() {
		    extend('a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.$',value);
		  });
		
			it("still works", function() {
			  expect(a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.$).toBe(value);
			});
		});
	});
	
	describe("the stuff you might pass it", function() {
		context("like functions", function() {
			var func = function() {}, result;
			context("passed a new function", function() {
				beforeEach(function() {
				  result = extend('blerg',func);
				});
				it("defines the function", function() {
				  expect(blerg).toBe(func);
				});
				it("returns the function too", function() {
				  expect(result).toBe(func);
				});
			});
			context("passed a function when one already exists ", function() {
				var thrown,name = 'panda';
				beforeEach(function() {
				  extend(name,func);
					try {
						extend(name,function() {});	
					} catch(e) {
						thrown = e;
					}					
				});
				it("throws an error", function() {
				  expect(thrown).toBe('Cannot define a new function "'+name+'", because one is already defined.');
				});
			});
			context("passed a function when the one that exists is the same function", function() {
			  it("doesn't throw anything", function() {
			    
			  });
			});
		});

		context("passed a new object", function() {

		});

		context("passed an object when one already exists", function() {

		});
	});
});