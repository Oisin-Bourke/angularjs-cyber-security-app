'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#!/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#!/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });

  describe('packageList',function () {

      beforeEach(function () {
          browser.get('index.html#!/view1');
      });

      it('should filter clients as a user types into the search box', function () {
          var packageList = element.all(by.repeater('package in $ctrl.clients'));
          var query = element(by.model('$ctrl.query'));

          expect(packageList.count()).toBe(4);

          query.sendKeys('1');
          expect(packageList.count()).toBe(3);

          it('should set a default value for the `orderProp` model', function() {
              expect(ctrl.orderProp).toBe('id');
          });

      });
  });

});
