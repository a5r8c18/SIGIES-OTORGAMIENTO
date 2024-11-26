module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,

    files: [
      // Incluir archivos de prueba específicos
      'src/**/*.spec.ts', // Ajusta el patrón según la ubicación de tus archivos de prueba
      'src/**/*.js',
      'src/**/*.ts',
      'src/test.ts', // Asegúrate de incluir este archivo
      // También puedes incluir otros archivos necesarios para las pruebas
      'src/app/components/cip_components/**/*.spec.ts',
      'src/app/components/cip_components/**/*.ts',
      'src/app/components/cip_components/**/*.js',

      'src/app/components/diul_components/**/*.spec.ts',
      'src/app/components/diul_components/**/*.ts',
      'src/app/components/diul_components/**/*.js',

      'src/app/components/student_components/**/*.spec.ts',
      'src/app/components/student_components/**/*.ts',
      'src/app/components/student_components/**/*.js',

      'src/app/components/official_components/**/*.spec.ts',
      'src/app/components/official_components/**/*.ts',
      'src/app/components/official_components/**/*.js',

      'src/app/components/table/*.spec.ts',
      'src/app/components/table/*.ts',
      'src/app/components/table/*.js',
    ],
  });
};
