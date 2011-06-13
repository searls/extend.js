window.context = window.describe;

var behavesLikeAnExtender = function(top) {
  describe("the names you might specify", function() {
    var value = {};
    context("passed a single identifier", function() {
      beforeEach(function() {
        top.extend('panda',value);
      });
      it("creates a single object on the top", function() {
        expect(top.panda).toBe(value);
      });
    });
    context("passed period-delimited identifiers", function() {
      beforeEach(function() {
        top.extend('code.retreat',value);
      });
      it("creates an object for each identifier", function() {
        expect(top.code.retreat).toBe(value);
      });
    });
    context("passed a humorously deep number of identifiers", function() {
      beforeEach(function() {
        top.extend('a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.$',value);
      });

      it("still works", function() {
        expect(top.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.$).toBe(value);
      });
    });
  });

  describe("the stuff you might pass it", function() {
    var name = 'panda', result;
    context("like functions", function() {
      var func = function() {};
      context("passed a new function", function() {
        beforeEach(function() {
          result = top.extend(name,func);
        });
        it("defines the function", function() {
          expect(top[name]).toBe(func);
        });
        it("returns the function too", function() {
          expect(result).toBe(func);
        });
      });
      context("passed a function when one already exists ", function() {
        var thrown;
        beforeEach(function() {
          top.extend(name,func);
          try {
            top.extend(name,function() {});
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
          top.extend(name,func);
          try {
            top.extend(name,func);
          } catch(e) {
            thrown = e;
          }
        });
        it("doesn't throw anything", function() {
          expect(thrown).not.toBeDefined();
        });
      });
      context("passed a function when the one that exists but no second arg is given", function() {
        var result,thrown;
        beforeEach(function() {
          top.extend(name,func);
          try {
            result = top.extend(name);
          } catch(e) {
            thrown = e;
          }
        });
        it("doesn't throw anything", function() {
          expect(thrown).not.toBeDefined();
        });

        it("returns the defined function", function() {
          expect(result).toBe(func);
        });
      });
    });
    context("like objects", function() {
      var obj = { a: 'A', b: 'B' };
      context("passed a new object", function() {
        beforeEach(function() {
          result = top.extend(name,obj);
        });

        it("defines the object", function() {
          expect(top[name]).toBe(obj);
        });

        it("returns the object", function() {
          expect(result).toBe(obj);
        });
      });

      context("passed an object when one already exists", function() {
        beforeEach(function() {
          top.extend(name,obj);
          result = top.extend(name, { b: "B'", c: 'C' });
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
          result = top.extend(name);
        });
        it("returns undefined", function() {
          expect(result).not.toBeDefined();
        });
      });
      context("when something already exists", function() {
        beforeEach(function() {
          top.extend(name,'fun!');
          result = top.extend(name);
        });
        it("returns that something", function() {
          expect(result).toBe('fun!');
        });
      });
    });

    afterEach(function() {
      delete top[name];
    });
  });
};

describe(".extend", function() {
  behavesLikeAnExtender(window);
});

describe("extend.myNamespace", function() {
  var namespace = {},result;
  beforeEach(function() {
    result = extend.myNamespace(namespace);
  });
  it("it adds an 'extend' function to an arbitrary object", function() {
    expect(namespace.extend).toBeDefined();
  });

  it("returns the new extend method", function() {
    expect(result).toBe(namespace.extend);
  });

  behavesLikeAnExtender(namespace);
});

describe("extend.noConflict", function() {
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