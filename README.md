# Material Admin
Material Design Inspired Admin Theme Utilizing the [Materialize CSS](http://materializecss.com/) Framework

![alt text][logo]

[logo]: https://github.com/briancwald/material_admin/blob/8.x-1.x/images/screenshot.png "Drupal Material Admin"

## Dev Requirments 
[Yarn package manager](https://yarnpkg.com)

## Dev Setup 
 - `yarn install` installs Yarn dependencies
 - `gulp libsrc` gets libraries
 - `gulp rename` renames conflict with jQueryUI and Materialize CSS autocomplete plugin
 - `gulp copy` moves updated libraries over to js/lib folder
 - `gulp sass` or `gulp` to watch sass changes

## To-Do
- [x] Gulp Setup
- [x] Add method to use materialize partials
- [x] Navigation / Local Tasks
- [x] Breadcrumbs (responsive)
- [x] Date and Time selector
- [x] Submit and action buttons
- [x] Vertical Tabs support desktop
- [ ] Vertical Tabs support mobile (menu style)
- [x] Submit button loading UX
- [x] Admin landing page / group styling
- [x] Dropbutton replacement
- [x] Throbber/progress icons
- [x] Admin/content enhancements 
- [x] Views UI
- [ ] Form styling defaults (90%)
- [x] Tables
- [x] Status pages
- [x] Status Message
- [x] Theme Select page
- [ ] Node add/edit (70%)
- [ ] jQueryUI Dialog Theme & Enhancements (70%)
- [ ] Behat Testing
- [ ] Visual Regression Testing

## Clean-up oganization To-Do
Since this is just a POC, code is not very well organized and needs to be matured. here is what I see so far:

- [ ] Make JS features optional in settings
- [ ] Move SCSS out of admin.scss into sub components (e.g. navigation, buttons, forms (done), etc.)
- [ ] Move preprocess functions into .inc files and out of .theme
- [ ] Better way to handle Materialize CSS overrides
- [ ] Remove Classy as a parent theme entirely?
- [ ] Prod deployment packaging (Min, optimize, etc)

## Meta

- Icons: currently using font awesome because sass integration allows for simple integration in D8 admin methods -- but looking at google material icons it might work fine -- switch for consistency?

- Grid: Implement a more structure grid system. The template structure in D8 has basically no notion of grid system. I have started to add in Materialize CSS very light grid system but it's awkward.
