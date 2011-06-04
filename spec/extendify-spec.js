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
		var name = 'panda', result;
		context("like functions", function() {
			var func = function() {};
			context("passed a new function", function() {
				beforeEach(function() {
				  result = extend(name,func);
				});
				it("defines the function", function() {
				  expect(window[name]).toBe(func);
				});
				it("returns the function too", function() {
				  expect(result).toBe(func);
				});
			});
			context("passed a function when one already exists ", function() {
				var thrown;
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
				var thrown;
				beforeEach(function() {
				  extend(name,func);
					try {
						extend(name,func);	
					} catch(e) {
						thrown = e;
					}
				});
			  it("doesn't throw anything", function() {
					expect(thrown).not.toBeDefined();
			  });
			});
		});
		context("like objects", function() {
			var obj = { a: 'A', b: 'B' };
			context("passed a new object", function() {
				beforeEach(function() {
					result = extend(name,obj);
				});
				
				it("defines the object", function() {
				  expect(window[name]).toBe(obj);
				});
				
				it("returns the object", function() {
				  expect(result).toBe(obj);
				});
			});

			context("passed an object when one already exists", function() {
				beforeEach(function() {
				  extend(name,obj);
					result = extend(name, { b: "B'", c: 'C' });
				});
				
				it("retains the property of the original", function() {
				  expect(result.a).toBe(obj.a);
				});
				
				it("overrides the common property", function() {
				  expect(result.b).toBe("B'");
				});
				
				it("defines the all-new property", function() {
				  expect(result.c).toBe('C');
				});
			});		  
		});
		
		context("passed nothing", function() {
			var result;
		  context("when nothing exists", function() {
				beforeEach(function() {
				  result = extend(name);
				});
		    it("returns undefined", function() {
		      expect(result).not.toBeDefined();
		    });
		  });
			context("when something already exists", function() {
				beforeEach(function() {
					extend(name,'fun!');
					result = extend(name);
				});
			  it("returns that something", function() {
			    expect(result).toBe('fun!');
			  });
			});
		});
		
		afterEach(function() {
		  delete window[name];
		});
	});
});

describe(".noConflict", function() {
	var theExtendBeingSpecifiedHere,result;
	beforeEach(function() {
		theExtendBeingSpecifiedHere = window.extend;
	  result = extend.noConflict();
	});
	afterEach(function() {
	  window.extend = theExtendBeingSpecifiedHere;
	});
	it("relinquishes control of window.extend to its previous owner", function() {
	  expect(window.previousOwnerOfExtend).toBe(window.extend);
	});
	it("returns the .extend function", function() {
	  expect(result).toBe(theExtendBeingSpecifiedHere);
	});
});