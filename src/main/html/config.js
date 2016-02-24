$(function () {
  var url;
  if (typeof swaggerSpec === 'undefined')
    url = '/output.json';
  else
    url = swaggerSpec;

  window.swaggerUi = new SwaggerUi({
    url: url,
    dom_id: "swagger-ui-container",
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
    onComplete: function (swaggerApi, swaggerUi) {
      $('pre code').each(function (i, e) {
        hljs.highlightBlock(e)
      });

      if (swaggerUi.options.url) {
        $('#input_baseUrl').val(swaggerUi.options.url);
      }
      if (swaggerUi.options.apiKey) {
        $('#input_apiKey').val(swaggerUi.options.apiKey);
      }

      $("[data-toggle='tooltip']").tooltip();

      $('#input_apiKey').val('rqpsx1FEknLqmzq2SzvS');
      addApiKeyAuthorization();
    },
    onFailure: function (data) {
      log("Unable to Load SwaggerUI");
    },
    docExpansion: "none",
    sorter: "alpha"
  });

  function addApiKeyAuthorization(){
    var key = encodeURIComponent($('#input_apiKey')[0].value);
    if(key && key.trim() != "") {
      var fullKeyValue = "Token token=" + key;
      var apiKeyAuth = new SwaggerClient.ApiKeyAuthorization("Authorization", fullKeyValue, "header");
      window.swaggerUi.api.clientAuthorizations.add("api_key", apiKeyAuth);
      log("added key " + key);
    }
  }
  $('#input_apiKey').change(addApiKeyAuthorization);
  window.swaggerUi.load();

  function log() {
    if ('console' in window) {
      console.log.apply(console, arguments);
    }
  }
});
