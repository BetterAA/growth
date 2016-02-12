var isWebView = ionic.Platform.isWebView();
var isIPad = ionic.Platform.isIPad();
var isIOS = ionic.Platform.isIOS();
var isAndroid = ionic.Platform.isAndroid();
var isWindowsPhone = ionic.Platform.isWindowsPhone();

angular.module('starter', [
    'ionic',
    'ngCordova',
    'hc.marked',
    'ionic.rating',
    'tabSlideBox',
    'jett.ionic.filter.bar',
    'pascalprecht.translate',
    'angularMoment',
    'ngResource',
    'ion-affix',
    'satellizer',
    'ngMessages',
    'starter.controllers',
    'starter.services'
  ])
  .run(function ($ionicPlatform, amMoment, $window, $translate) {
    amMoment.changeLocale('zh-cn');

    $ionicPlatform.ready(function () {
      if (typeof analytics !== 'undefined') {
        analytics.startTrackerWithId('UA-71907748-1');
        analytics.trackView('Growth')
      } else {
        console.log("Google Analytics plugin could not be loaded.")
      }
      if (window.cordova && window.cordova.plugins.Keyboard && !ionic.Platform.isWindowsPhone()) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
        if (isAndroid) {
          StatusBar.backgroundColorByHexString("#5e6772");
        }
      }

      var language = $window.localStorage.getItem('language');
      if (language !== undefined) {
        $translate.use(language);
        amMoment.changeLocale(language);
      } else {
        amMoment.changeLocale('zh-cn');
      }
    });
  })

  .config(function ($cordovaAppRateProvider) {
    document.addEventListener("deviceready", function () {
      var prefs = {
        language: 'zh-Hans',
        appName: 'Growth',
        iosURL: '1078807522',
        androidURL: 'market://details?id=ren.growth',
        windowsURL: 'ms-windows-store:Review?name=51077Phodal.GrowthRen_d4jwzt1r37cxj'
      };
      var strings = {
        title: '动动手指，为我们打分',
        message: '无论是来自亲的赞美诗，还是让亲唾沫横飞的槽点，我们只愿——让评价来得更猛烈些吧！',
        cancelButtonLabel: '残忍地拒绝',
        laterButtonLabel: '容我考虑考虑',
        rateButtonLabel: '马上就去'
      };
      $cordovaAppRateProvider.setCustomLocale(strings);
      $cordovaAppRateProvider.setPreferences(prefs);
    }, false);
  })

  .config(function ($ionicConfigProvider, $authProvider) {
    $ionicConfigProvider.navBar.alignTitle('left');
    $ionicConfigProvider.tabs.position('bottom');

    if (isElectron) {
      $ionicConfigProvider.tabs.position('top');
    }

    $ionicConfigProvider.backButton.text('');
    $ionicConfigProvider.backButton.previousTitleText(false);
    $authProvider.cordova = true;

    $authProvider.github({
      clientId: '263f260896d71b9a3582',
      redirectUri: 'http://localhost/',
      //authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      url: 'http://forum.growth.ren/auth/github'
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
    $translateProvider.useSanitizeValueStrategy('');

    $translateProvider.translations('en', SIDE_MENU['en']);
    $translateProvider.translations('en', MAIN_VIEW_MENU['en']);
    $translateProvider.translations('en', PAGE_TITLE['en']);
    $translateProvider.translations('en', DAY_TITLE['en']);
    $translateProvider.translations('en', ABOUT_MENU['en']);
    $translateProvider.translations('en', EXAM_MENU['en']);
    $translateProvider.translations('en', BOOK_ROADMAP_MENU['en']);
    $translateProvider.translations('en', PRACTICAL_PROGRAMMING['en']);
    $translateProvider.translations('en', ARCHITECTURE_DESIGN['en']);
    $translateProvider.translations('en', METHODOLOGY['en']);
    $translateProvider.translations('en', LEADERSHIP['en']);
    $translateProvider.translations('en', HELPER_ARTICLES['en']);
    $translateProvider.translations('en', COMMUNITY['en']);


    $translateProvider.translations('zh-cn', DAY_TITLE['zh-cn']);
    $translateProvider.translations('zh-cn', SIDE_MENU['zh-cn']);
    $translateProvider.translations('zh-cn', MAIN_VIEW_MENU['zh-cn']);
    $translateProvider.translations('zh-cn', PAGE_TITLE['zh-cn']);
    $translateProvider.translations('zh-cn', ABOUT_MENU['zh-cn']);
    $translateProvider.translations('zh-cn', EXAM_MENU['zh-cn']);
    $translateProvider.translations('zh-cn', BOOK_ROADMAP_MENU['zh-cn']);
    $translateProvider.translations('zh-cn', PRACTICAL_PROGRAMMING['zh-cn']);
    $translateProvider.translations('zh-cn', ARCHITECTURE_DESIGN['zh-cn']);
    $translateProvider.translations('zh-cn', METHODOLOGY['zh-cn']);
    $translateProvider.translations('zh-cn', LEADERSHIP['zh-cn']);
    $translateProvider.translations('zh-cn', HELPER_ARTICLES['zh-cn']);
    $translateProvider.translations('zh-cn', COMMUNITY['zh-cn']);

    $translateProvider.preferredLanguage('zh-cn');
    $translateProvider.fallbackLanguage('en');
  })
  .config(['markedProvider', function (markedProvider) {
    marked.Lexer.rules.gfm.heading = marked.Lexer.rules.normal.heading;
    marked.Lexer.rules.tables.heading = marked.Lexer.rules.normal.heading;

    markedProvider.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function (code, lang) {
        if (lang) {
          return hljs.highlight(lang, code, true).value;
        } else {
          return hljs.highlightAuto(code).value;
        }
      }
    });
    markedProvider.setRenderer({
      heading: function (text, level) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        return '<h' + level + '><a name="' + escapedText + '" class="anchor" href="#' + escapedText + '"><span class="header-link"></span></a>' + text + '</h' + level + '>';
      },
      image: function (href) {
        return "<img class='full-image' src=" + href + ">";
      }
    });
  }])
  .config(function ($stateProvider, $urlRouterProvider) {
    var appState = {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    };

    var SolutionState = {
      url: "/solution",
      views: {
        'app-solution': {
          templateUrl: "templates/more/solution.html",
          controller: 'SolutionCtrl'
        }
      }
    };

    var day0 = {
      url: '/day/0',
      views: {
        'app-main': {
          templateUrl: 'templates/days/day0.html',
          controller: 'DayCtrl'
        }
      }
    };
    var day1 = {
      url: '/day/1',
      views: {
        'app-main': {
          templateUrl: 'templates/days/day1.html',
          controller: 'DayCtrl'
        }
      }
    };
    var day2 = {
      url: '/day/2',
      views: {
        'app-main': {
          templateUrl: 'templates/days/day2.html',
          controller: 'DayCtrl'
        }
      }
    };
    var day3 = {
      url: '/day/3',
      views: {
        'app-main': {
          templateUrl: 'templates/days/day3.html',
          controller: 'DayCtrl'
        }
      }
    };
    var day4 = {
      url: '/day/4',
      views: {
        'app-main': {
          templateUrl: 'templates/days/day4.html',
          controller: 'DayCtrl'
        }
      }
    };
    var day5 = {
      url: '/day/5',
      views: {
        'app-main': {
          templateUrl: 'templates/days/day5.html',
          controller: 'DayCtrl'
        }
      }
    };
    var day6 = {
      url: '/day/6',
      views: {
        'app-main': {
          templateUrl: 'templates/days/day6.html',
          controller: 'DayCtrl'
        }
      }
    };
    var day7 = {
      url: '/day/7',
      views: {
        'app-main': {
          templateUrl: 'templates/days/day7.html',
          controller: 'DayCtrl'
        }
      }
    };
    var mainState = {
      url: '/main',
      parent: "app",
      views: {
        'app-main': {
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl'
        }
      }
    };
    var skillTreeState = {
      url: '/skilltree',
      views: {
        'app-main@app': {
          templateUrl: 'templates/skills/skilltree.html',
          controller: 'skillTreeControl'
        }
      }
    };
    var aiState = {
      url: '/ai',
      views: {
        'app-main@app': {
          templateUrl: 'templates/skills/ai.html',
          controller: 'AIControl'
        }
      }
    };
    var achieventmentState = {
      url: '/achievement',
      views: {
        'app-main@app': {
          templateUrl: 'templates/skills/achievement.html',
          controller: 'AchievementCtrl'
        }
      }
    };
    var communityState = {
      url: '/community',
      views: {
        'app-community': {
          templateUrl: 'templates/community/community.html',
          controller: 'CommunityCtrl'
        }
      }
    };
    var loginState = {
      url: '/login',
      views: {
        'app-community': {
          templateUrl: 'templates/community/login.html',
          controller: 'LoginCtrl'
        }
      }
    };
    var registerState = {
      url: '/register',
      views: {
        'app-community': {
          templateUrl: 'templates/community/signin.html',
          controller: 'SigninCtrl'
        }
      }
    };
    var createState = {
      url: '/topic/create',
      views: {
        'app-community': {
          templateUrl: 'templates/community/create.html',
          controller: 'CreateCtrl'
        }
      }
    };
    var topicState = {
      url: '/topic/:id',
      views: {
        'app-community': {
          templateUrl: 'templates/community/topic.html',
          controller: 'TopicCtrl',
          resolve: {
            discussion: function (Discussions, $stateParams) {
              return Discussions.get({id: $stateParams.id});
            }
          }
        }
      }
    };
    var userState = {
      url: '/user/:id',
      views: {
        'app-community': {
          templateUrl: 'templates/community/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    };
    var statckState = {
      url: "/stack/:stack",
      views: {
        'app-community': {
          templateUrl: "templates/skills/stack.html",
          controller: 'StackCtrl'
        }
      }
    };
    var moreState = {
      url: '/more',
      views: {
        'app-more': {
          templateUrl: 'templates/more/more.html',
          controller: 'MoreCtrl'
        }
      }
    };
    var todoState = {
      url: '/todo',
      views: {
        'app-more': {
          templateUrl: 'templates/more/todo.html',
          controller: 'TodoViewCtrl'
        }
      }
    };
    var aboutState = {
      url: '/about',
      views: {
        'app-more': {
          templateUrl: 'templates/more/about.html',
          controller: 'AboutCtrl'
        }
      }
    };
    var settingState = {
      url: '/setting',
      views: {
        'app-more': {
          templateUrl: 'templates/more/setting.html',
          controller: 'SettingCtrl'
        }
      }
    };
    var articleState = {
      url: '/article/:slug',
      views: {
        'app-more@app': {
          templateUrl: 'templates/read/article-detail.html',
          controller: 'ArticleCtrl'
        }
      }
    };
    var articlesState = {
      url: '/articles',
      views: {
        'app-more': {
          templateUrl: 'templates/read/article-list.html',
          controller: 'ArticleListCtrl'
        }
      }
    };
    var reviewState = {
      url: '/review/:slug',
      views: {
        'app-more@app': {
          templateUrl: 'templates/read/review-detail.html',
          controller: 'ReviewCtrl'
        }
      }
    };
    var reviewsState = {
      url: '/reviews',
      views: {
        'app-more': {
          templateUrl: 'templates/read/review-list.html',
          controller: 'ReviewListCtrl'
        }
      }
    };
    var bookState = {
      url: '/book',
      views: {
        'app-more': {
          templateUrl: 'templates/read/book.html'
        }
      }
    };
    var progState = {
      url: '/books/prog',
      views: {
        'app-more@app': {
          templateUrl: 'templates/books/prog.html'
        }
      }
    };
    var archState = {
      url: '/books/arch',
      views: {
        'app-more@app': {
          templateUrl: 'templates/books/arch.html'
        }
      }
    };
    var methodState = {
      url: '/books/method',
      views: {
        'app-more@app': {
          templateUrl: 'templates/books/method.html'
        }
      }
    };
    var thinkState = {
      url: '/books/think',
      views: {
        'app-more@app': {
          templateUrl: 'templates/books/think.html'
        }
      }
    };
    var bookfeState = {
      url: '/books/fe',
      views: {
        'app-more@app': {
          templateUrl: 'templates/books/fe.html'
        }
      }
    };
    var examState = {
      url: '/exam',
      views: {
        'app-exam': {
          templateUrl: 'templates/exam.html',
          'controller': 'ExamCtrl'
        }
      }
    };
    var quizState = {
      url: '/quiz/:slug',
      views: {
        'app-exam@app': {
          templateUrl: 'templates/game/quiz.html',
          controller: 'AllQuizCtrl'
        }
      }
    };
    var advancedQuizState = {
      url: '/advance-quiz/:slug',
      views: {
        'app-exam@app': {
          templateUrl: 'templates/game/advance-quiz.html',
          controller: 'AdvancedQuizCtrl'
        }
      }
    };

    $stateProvider
      .state('app', appState)
      .state('app.solution', SolutionState)

      .state('app.day0', day0)
      .state('app.day1', day1)
      .state('app.day2', day2)
      .state('app.day3', day3)
      .state('app.day4', day4)
      .state('app.day5', day5)
      .state('app.day6', day6)
      .state('app.day7', day7)

      .state('app.main', mainState)
      .state('app.skilltree', skillTreeState)
      .state('app.ai', aiState)
      .state('app.achievement', achieventmentState)

      .state('app.community', communityState)
      .state('app.login', loginState)
      .state('app.register', registerState)
      .state('app.topic-create', createState)
      .state('app.topic', topicState)
      .state('app.user', userState)
      .state('app.stack', statckState)

      .state('app.more', moreState)
      .state('app.todo', todoState)
      .state('app.about', aboutState)
      .state('app.setting', settingState)
      .state('app.article', articleState)
      .state('app.articles', articlesState)
      .state('app.review', reviewState)
      .state('app.reviews', reviewsState)

      .state('app.book', bookState)
      .state('app.prog', progState)
      .state('app.arch', archState)
      .state('app.method', methodState)
      .state('app.think', thinkState)
      .state('app.bookfe', bookfeState)

      .state('app.exam', examState)
      .state('app.quiz', quizState)
      .state('app.advancedQuiz', advancedQuizState)
    ;

    $urlRouterProvider.otherwise('/app/main');
  });

angular.module('starter.controllers', ['starter.factory', 'hljs', 'starter.utils', 'ionic.contrib.ui.tinderCards']);
