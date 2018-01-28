# Material Admin
Material Design Inspired Admin Theme Utilizing the [Materialize CSS](http://materializecss.com/) Framework

![alt text][logo]

[logo]: https://github.com/briancwald/material_admin/blob/8.x-1.x/images/screenshot.png "Drupal Material Admin"

## Dev Requirements 
[Yarn package manager](https://yarnpkg.com)

## Dev Setup 
 - `yarn install` installs Yarn dependencies
 - `gulp libsrc` gets libraries and places them in the vendor directory
 - `gulp rename` renames conflict with jQueryUI and Materialize CSS autocomplete plugin and places it in /js/lib to manage in git repo.
 - `gulp sass` or `gulp` to watch sass changes


 ## Features Notes

 - Additional features supported with [Material Admin Support](https://github.com/briancwald/material_admin_support) module.
 - Portal style login [screenshot](https://materialadmin.com/img/portal-login.png). To use this, you will want to alter the login paths to use the admin theme. I created a simple module that does this for you: https://www.drupal.org/project/admin_login_path
 - Breadcrumbs are set in `/config/install` to be placed in a region "breadcrumbs" which display below the header. If you would like to reduce the the vertical space. you can move the breadcrumbs to the header above the site branding block, which is styled to use Material Design standard for applications.

## To-Do
- [x] Gulp Setup
- [x] Add method to use materialize partials
- [x] Navigation / Local Tasks
- [x] Breadcrumbs (responsive)
- [x] Date and Time selector
- [x] Submit and action buttons
- [x] Vertical Tabs support desktop
- [x] Vertical Tabs support mobile (menu style)
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
- [x] Node add/edit
- [x] jQueryUI Dialog Theme & Enhancements
- [ ] Add generic 'card' twig template
- [ ] Behat Testing
- [ ] Visual Regression Testing

## Contrib module admin UI support
Some contrib modules have complex UIs defined and the only way to really support them is by adding specific styling.

- [x] [Entity Browser](https://www.drupal.org/project/entity_browser)
- [ ] [Paragraphs](https://www.drupal.org/project/paragraphs)
- [x] [Webform](https://www.drupal.org/project/webform)
- [x] [Fieldgroup](https://www.drupal.org/project/field_group)

## Clean-up oganization To-Do
Since this is just a POC, code is not very well organized and needs to be matured. here is what I see so far:

- [x] Make JS features optional in settings
- [x] Move SCSS out of admin.scss into sub components (e.g. navigation, buttons, forms (done), etc.)
- [x] Move preprocess functions into .inc files and out of .theme
- [x] Easy color swap in SCSS variables (_settings.scss)
- [ ] Better way to handle Materialize CSS overrides
- [ ] Prod deployment packaging (Min, optimize, etc)
- [x] Code standards + Lint
