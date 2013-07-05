# extend.js

Ever wanted a nice tidy way to build out a JavaScript namespace without needing to adopt a broader framework to do it for you? Me too.

It's called extend.js, and you just hand it an arbitrarily nested namespace string, the object or function you want to occupy that namespace, and it will define the objects you need while preserving whatever has already been defined.

And do you like your JavaScript dependencies to be tiny? I ask, because extend.js is only **600 bytes**. May my JavaScript friends who [obsess](http://twitter.com/dmosher/status/73158951235108866) over the size of each dependency delight in its tiny-ness.

The only thing extend.js depends on is [Underscore.js](http://documentcloud.github.com/underscore/), because Underscore.js is so fantastic that I'd happily force it on strangers.

## Usage

To get started, pull in underscore.js & extend.js

    <script type="text/javascript" src="lib/underscore-min.js"></script>
    <script type="text/javascript" src="lib/extend.0.0.2.min.js"></script>

### Extending a namespace right off window

To start building a namespace on the window:

     extend('widgets.fizbots.cranks',{
       cranking: true
     });
     widgets.fizbots.cranks; //=> { cranking: true }

You can use extend.js to define functions, too:

    extend('plato.form.Chair',function(){
      return { legs: [1,2,3,4] };
    });
    plato.form.Chair(); //=> { legs: [1,2,3,4] }

You can also override object definitions:

    extend('cats',{
       longCat: 'is long'
    });
    extend('cats',{
       ceilingCat: 'is watching you'
    });
    window.cats; //=> { longCat: 'is long', ceilingCat: 'is watching you' }

### Extending your own custom namespace root

Your project probably already has a namespace root, so you can tell extend.js to add the `extend` method to your namespace. Let's say your namespace root is `window.pants`:

    extend.myNamespace(pants); //=> pants.extend (Function)

Now you can do this:

    pants.extend('components.zipper',{ position: 'up' }); //=> pants.components.zipper

### No-conflict mode

If you only plan on using extend.js on your custom namespace (which is hopefully the case), you can reclaim the window.extend namespace by throwing extend.js into no-conflict mode:

    extend.noConflict(); //returns extend.js

This will return extend.js itself while restoring `window.extend` to whatever occupied it previously.
