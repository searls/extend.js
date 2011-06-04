# extend.js

Ever wanted a nice tidy way to build out a JavaScript namespace without needing to adopt a broader framework to do it for you? Me too.

You just hand it an arbitrarily nested namespace (as a string), the object or function you want to occupy that namespace, and all extend.js does is define that namespace while preserving whatever objects are already defined.

The only thing it depends on is [Underscore.js](http://documentcloud.github.com/underscore/), because Underscore.js is so fantastic that I'd happily force it on strangers.

To get started, pull in underscore.js & extend.js

    <script type="text/javascript" src="underscore-min.js"></script>
    <script type="text/javascript" src="extend.js"></script>

## Extending a namespace right off window

To start building a namespace on the window:

     extend('widgets.fizbots.cranks',{
       cranking: true
     });
     widgets.fizbots.cranks; //=> { cranking: true }

You can use extend to define functions, too:

    extend('plato.form.Chair',function(){
      return { legs: [1,2,3,4] };
    }); 
    plato.form.Chair(); //=> { legs: [1,2,3,4] }

You can override object definitions, too:

    extend('cats',{
       longCat: 'is long'
    });
    extend('cats',{
       ceilingCat: 'is watching you'
    });
    window.cats; //=> { longCat: 'is long', ceilingCat: 'is watching you' }

## Extending your own custom namespace root

Your project probably already has a namespace root, so you can tell extend.js to add the `extend` method to your namespace. Let's say your namespace root is `window.pants`:

    extend.myNamespace(pants); //=> pants.extend (Function)

Now you can do this:

    pants.extend('components.zipper',{ position: 'up' }); //=> pants.components.zipper 

If you only plan on using extend.js on your custom namespace (which is hopefully the case), you can reclaim the window.extend namespace by throwing extend.js into no-conflict mode:

    extend.noConflict(); //returns extend.js 

This will return extend.js itself while restoring `window.extend` to whatever occupied it previously.