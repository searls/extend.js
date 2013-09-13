window.context = window.describe

itBehavesLikeAnExtender = ->
  describe "the names you might specify", ->
    value = {}
    context "passed a single identifier", ->
      beforeEach ->
        @subject.extend("panda", value)

      it "creates a single object on the top", ->
        expect(@subject.panda).toBe(value)

    context "passed period-delimited identifiers", ->
      beforeEach ->
        @subject.extend("code.retreat", value)

      it "creates an object for each identifier", ->
        expect(@subject.code.retreat).toBe(value)

    context "passed forward-slash-delimited identifiers", ->
      beforeEach ->
        @subject.extend("pants/sale/time", value)

      it "creates an object for each identifier", ->
        expect(@subject.pants.sale.time).toBe(value)

    context "passed back-slash-delimited identifiers", ->
      beforeEach ->
        @subject.extend("test\\pollution\\sucks", value)

      it "creates an object for each identifier", ->
        expect(@subject.test.pollution.sucks).toBe(value)


    context "passed a humorously deep number of identifiers", ->
      beforeEach ->
        @subject.extend("a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.$", value)

      it "still works", ->
        expect(@subject.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.$).toBe(value)

  describe "the stuff you might pass it", ->
    name = "panda"
    result = undefined
    context "like functions", ->
      func = -> "uno"
      func2 = -> "dos"
      func2.prop = "tea"


      context "passed a new function", ->
        beforeEach ->
          result = @subject.extend(name, func)

        it "defines the function", ->
          expect(@subject[name]).toBe(func)

        it "returns the function too", ->
          expect(result).toBe(func)


      context "passed a function when one already exists", ->
        beforeEach ->
          @subject.extend(name, func)
          result = @subject.extend(name, func2)

        it "adds properties to the existing function object", ->
          expect(@subject.panda.prop).toBe("tea")

        it "returns the existing function", ->
          expect(result).toBe(func)

      context "passed multiple functions", ->
        beforeEach ->
          result = @subject.extend(name, func, func2)

        it "extends the 'first' function", ->
          expect(@subject.panda).toBe(func)

        it "returns the extended function", ->
          expect(result).toBe(func)

        it "adds properties to the first function object", ->
          expect(@subject.panda.prop).toBe("tea")


    context "like objects", ->
      obj =
        a: "A"
        b: "B"

      context "passed a new object", ->
        beforeEach ->
          result = @subject.extend(name, obj)

        it "defines the object", ->
          expect(@subject[name]).toBe(obj)

        it "returns the object", ->
          expect(result).toBe(obj)


      context "passed an object when one already exists", ->
        beforeEach ->
          @subject.extend(name, obj)
          result = @subject.extend(name,
            b: "B'"
            c: "C"
          )

        it "retains the property of the original", ->
          expect(result.a).toBe(obj.a)

        it "overrides the common property", ->
          expect(result.b).toBe("B'")

        it "defines the all-new property", ->
          expect(result.c).toBe("C")

      context "passed multiple objects", ->
        beforeEach ->
          @subject.extend(name, obj)
          result = @subject.extend name,
            b: "B'"
            c: "C"
          ,
            c: "C'"
            d: "D"

        it "merges objects right-to-left", ->
          expect(result).toEqual
            a: "A"
            b: "B'"
            c: "C'"
            d: "D"


    context "passed nothing", ->
      result = undefined
      context "when nothing exists", ->
        beforeEach ->
          result = @subject.extend(name)

        it "returns undefined", ->
          expect(result).not.toBeDefined()


      context "when something already exists", ->
        beforeEach ->
          @subject.extend name, "fun!"
          result = @subject.extend(name)

        it "returns that something", ->
          expect(result).toBe("fun!")

    afterEach ->
      delete @subject[name]

describe ".extend", ->
  beforeEach ->
    @subject = window
  itBehavesLikeAnExtender()

describe "extend.myNamespace", ->
  beforeEach ->
    @subject = {}
    @result = undefined

  context "with an existing namespace object", ->
    beforeEach ->
      @result = extend.myNamespace(@subject)

    itBehavesLikeAnExtender()

    it "it adds an 'extend' function to an arbitrary object", ->
      expect(@subject.extend).toBeDefined()

    it "returns the namespace object", ->
      expect(@result).toBe(@subject)

  context "without an existing namespace object", ->
    beforeEach ->
      @subject = extend.myNamespace()

    itBehavesLikeAnExtender()

    it "it adds an 'extend' function to a new namespace object", ->
      expect(@subject.extend).toBeDefined()

describe "extend.noConflict", ->
  theExtendBeingSpecifiedHere = undefined
  result = undefined
  beforeEach ->
    theExtendBeingSpecifiedHere = window.extend
    result = extend.noConflict()

  afterEach ->
    window.extend = theExtendBeingSpecifiedHere

  it "relinquishes control of window.extend to its previous owner", ->
    expect(window.previousOwnerOfExtend).toBe(window.extend)

  it "returns the .extend function", ->
    expect(result).toBe(theExtendBeingSpecifiedHere)
