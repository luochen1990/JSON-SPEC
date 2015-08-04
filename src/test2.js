(function ($) {
    return function(bind, specs, style) {
      $('head').append("<style>" + style + "</style>");
      $('.typespec-hook').each(function(i, elm) {
        return $(elm).append(specs[$(elm).attr('it')]);
      });
      return bind($('.typespec'));
    };
  })(jQuery)((function ($) {
    return function(rootSelection) {
      rootSelection.find('ul').each(function(i, elm) {
        return $(elm).closest('li,.spec').addClass('unfolded').removeClass('folded');
      });
      rootSelection.find('.type-name').each(function(i, elm) {
        $(elm).closest('li,.spec').addClass('folded').removeClass('unfolded');
        return $(elm).click(function() {
          return $(elm).closest('li,.spec').toggleClass('folded').toggleClass('unfolded');
        });
      });
      return rootSelection.find('li').each(function(i, elm) {
        $(elm).children('.unfold').children('.field-name').click(function() {
          return $(elm).addClass('folded').removeClass('unfolded');
        });
        return $(elm).children('.fold').children('.field-name').click(function() {
          return $(elm).addClass('unfolded').removeClass('folded');
        });
      });
    };
  })(jQuery), {"a":"<div class='typespec'><div class='spec'><div class='fold'><span class='spliter'>spec:</span><span class='type-name'>TableName</span></div><div class='unfold'><span class='spliter'>spec:</span><span><span class='type-name'>TableName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></div>\n<div class='sample'>\n<span class='spliter'>sample:</span><span>\"table1\"</span></div></div>","b":"<div class='typespec'><div class='spec'><div class='fold'><span class='spliter'>spec:</span><span class='type-maker'>[<span class='field-name'>{...}</span>]</span></div><div class='unfold'><span class='spliter'>spec:</span><span class='type-maker'>[<span class='type-maker'>{</span></span><ul><li><div class='fold'><span class='field-name'>tableName</span>: <span class='type-name'>TableName</span></div><div class='unfold'><span class='field-name'>tableName</span>: <span><span class='type-name'>TableName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li><li><div class='fold'><span class='field-name'>join</span>: <span class='field-name'>{...}</span></div><div class='unfold'><span class='field-name'>join</span>: <span class='type-maker'>{</span><ul><li><div class='fold'><span class='field-name'>leftTableName</span>: <span class='type-name'>TableName</span></div><div class='unfold'><span class='field-name'>leftTableName</span>: <span><span class='type-name'>TableName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li><li><div class='fold'><span class='field-name'>left</span>: <span class='type-name'>FieldName</span></div><div class='unfold'><span class='field-name'>left</span>: <span><span class='type-name'>FieldName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li><li><span class='field-name'>op</span>: <span class='type-maker'>Enum [\"=\",\"<\",\"<=\",\">=\",\">\"]</span></li><li><div class='fold'><span class='field-name'>right</span>: <span class='type-name'>FieldName</span></div><div class='unfold'><span class='field-name'>right</span>: <span><span class='type-name'>FieldName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li></ul><span class='type-maker'>}</span></div></li></ul><span class='type-maker'><span class='type-maker'>}</span>]</span></div></div>\n<div class='sample'>\n<span class='spliter'>sample:</span><pre>[\n    {\n        \"tableName\": \"table1\",\n        \"join\": {\n            \"leftTableName\": \"table1\",\n            \"left\": \"product_id\",\n            \"op\": \"=\",\n            \"right\": \"product_id\"\n        }\n    }\n]</pre></div></div>","c":"<div class='typespec'><div class='spec'><div class='fold'><span class='spliter'>spec:</span><span class='field-name'>{...}</span></div><div class='unfold'><span class='spliter'>spec:</span><span class='type-maker'>{</span><ul><li><div class='fold'><span class='field-name'>filter</span>: <span class='field-name'>Strict {...}</span></div><div class='unfold'><span class='field-name'>filter</span>: <span class='type-maker'>Strict {</span><ul><li><div class='fold'><span class='field-name'>dimensions</span>: <span class='type-maker'>Map <span class='type-name'>DimensionName</span> <span class='type-name'>DimensionFilter</span></span></div><div class='unfold'><span class='field-name'>dimensions</span>: <span class='type-maker'>Map (</span><ul><li><div class='fold'><span class='meta-field'>key</span>: <span class='type-name'>DimensionName</span></div><div class='unfold'><span class='meta-field'>key</span>: <span><span class='type-name'>DimensionName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li><li><div class='fold'><span class='meta-field'>value</span>: <span class='type-name'>DimensionFilter</span></div><div class='unfold'><span class='meta-field'>value</span>: <span><span class='type-name'>DimensionFilter</span><span class='spliter'>spec:</span><span class='type-maker'>Strict {</span></span><ul><li><div class='fold'><span class='field-name'>select</span>: <span class='type-maker'>[<span class='type-name'>MemberName</span>]</span></div><div class='unfold'><span class='field-name'>select</span>: <span class='type-maker'>[<span><span class='type-name'>MemberName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></span><span class='type-maker'>]</span></div></li><li><div class='fold'><span class='field-name'>match</span>: <span class='type-maker'>Either {contains: String, startWith: String, endWith: String}</span></div><div class='unfold'><span class='field-name'>match</span>: <span class='type-maker'>Strict {</span><ul><li><span class='field-name'>contains</span>: <span class='type-maker'>String</span></li><li><span class='field-name'>startWith</span>: <span class='type-maker'>String</span></li><li><span class='field-name'>endWith</span>: <span class='type-maker'>String</span></li></ul><span class='type-maker'>}</span></div></li><li><div class='fold'><span class='field-name'>condition</span>: <span class='type-maker'>Either {limit: Strict {measure: Measure, comparator: Enum [\"=\" ...], value: Number}, expr: ConditionExpr}</span></div><div class='unfold'><span class='field-name'>condition</span>: <span class='type-maker'>Strict {</span><ul><li><div class='fold'><span class='field-name'>limit</span>: <span class='field-name'>Strict {...}</span></div><div class='unfold'><span class='field-name'>limit</span>: <span class='type-maker'>Strict {</span><ul><li><div class='fold'><span class='field-name'>measure</span>: <span class='type-name'>Measure</span></div><div class='unfold'><span class='field-name'>measure</span>: <span><span class='type-name'>Measure</span><span class='spliter'>spec:</span><span class='type-maker'>Strict {</span></span><ul><li><div class='fold'><span class='field-name'>name</span>: <span class='type-name'>MeasureName</span></div><div class='unfold'><span class='field-name'>name</span>: <span><span class='type-name'>MeasureName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li><li><span class='field-name'>aggregator</span>: <span class='type-maker'>Enum [\"sum\",\"avg\",\"max\",\"min\"]</span></li></ul><span class='type-maker'>}</span></div></li><li><span class='field-name'>comparator</span>: <span class='type-maker'>Enum [\"=\",\"<\",\"<=\",\">=\",\">\"]</span></li><li><span class='field-name'>value</span>: <span class='type-maker'>Number</span></li></ul><span class='type-maker'>}</span></div></li><li><div class='fold'><span class='field-name'>expr</span>: <span class='type-name'>ConditionExpr</span></div><div class='unfold'><span class='field-name'>expr</span>: <span><span class='type-name'>ConditionExpr</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li></ul><span class='type-maker'>}</span></div></li><li><div class='fold'><span class='field-name'>top</span>: <span class='field-name'>Strict {...}</span></div><div class='unfold'><span class='field-name'>top</span>: <span class='type-maker'>Strict {</span><ul><li><span class='field-name'>count</span>: <span class='type-maker'>Number</span></li><li><div class='fold'><span class='field-name'>by</span>: <span class='type-maker'>Either {measure: Measure, expr: ValueExpr}</span></div><div class='unfold'><span class='field-name'>by</span>: <span class='type-maker'>Strict {</span><ul><li><div class='fold'><span class='field-name'>measure</span>: <span class='type-name'>Measure</span></div><div class='unfold'><span class='field-name'>measure</span>: <span><span class='type-name'>Measure</span><span class='spliter'>spec:</span><span class='type-maker'>Strict {</span></span><ul><li><div class='fold'><span class='field-name'>name</span>: <span class='type-name'>MeasureName</span></div><div class='unfold'><span class='field-name'>name</span>: <span><span class='type-name'>MeasureName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li><li><span class='field-name'>aggregator</span>: <span class='type-maker'>Enum [\"sum\",\"avg\",\"max\",\"min\"]</span></li></ul><span class='type-maker'>}</span></div></li><li><div class='fold'><span class='field-name'>expr</span>: <span class='type-name'>ValueExpr</span></div><div class='unfold'><span class='field-name'>expr</span>: <span><span class='type-name'>ValueExpr</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li></ul><span class='type-maker'>}</span></div></li></ul><span class='type-maker'>}</span></div></li></ul><span class='type-maker'>}</span></div></li></ul><span class='type-maker'>)</span></div></li><li><div class='fold'><span class='field-name'>measures</span>: <span class='type-maker'>[<span class='field-name'>Strict {...}</span>]</span></div><div class='unfold'><span class='field-name'>measures</span>: <span class='type-maker'>[<span class='type-maker'>Strict {</span></span><ul><li><div class='fold'><span class='field-name'>measure</span>: <span class='type-name'>Measure</span></div><div class='unfold'><span class='field-name'>measure</span>: <span><span class='type-name'>Measure</span><span class='spliter'>spec:</span><span class='type-maker'>Strict {</span></span><ul><li><div class='fold'><span class='field-name'>name</span>: <span class='type-name'>MeasureName</span></div><div class='unfold'><span class='field-name'>name</span>: <span><span class='type-name'>MeasureName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li><li><span class='field-name'>aggregator</span>: <span class='type-maker'>Enum [\"sum\",\"avg\",\"max\",\"min\"]</span></li></ul><span class='type-maker'>}</span></div></li><li><div class='fold'><span class='field-name'>limit</span>: <span class='field-name'>{...}</span></div><div class='unfold'><span class='field-name'>limit</span>: <span class='type-maker'>{</span><ul><li><span class='field-name'>minBound</span>: <span class='type-maker'>Maybe <span class='type-maker'>Number</span></span></li><li><span class='field-name'>maxBound</span>: <span class='type-maker'>Maybe <span class='type-maker'>Number</span></span></li></ul><span class='type-maker'>}</span></div></li></ul><span class='type-maker'><span class='type-maker'>}</span>]</span></div></li><li><div class='fold'><span class='field-name'>inclusions</span>: <span class='type-maker'>[<span class='type-name'>InclusionCondition</span>]</span></div><div class='unfold'><span class='field-name'>inclusions</span>: <span class='type-maker'>[<span><span class='type-name'>InclusionCondition</span><span class='spliter'>spec:</span><span class='type-maker'>Strict {</span></span></span><ul><li><div class='fold'><span class='field-name'>via</span>: <span class='type-maker'>[<span class='type-name'>DimensionName</span>]</span></div><div class='unfold'><span class='field-name'>via</span>: <span class='type-maker'>[<span><span class='type-name'>DimensionName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></span><span class='type-maker'>]</span></div></li><li><div class='fold'><span class='field-name'>positions</span>: <span class='type-maker'>[<span class='type-maker'>[<span class='type-name'>MemberName</span>]</span>]</span></div><div class='unfold'><span class='field-name'>positions</span>: <span class='type-maker'>[<span class='type-maker'>[<span><span class='type-name'>MemberName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></span></span><span class='type-maker'><span class='type-maker'>]</span>]</span></div></li></ul><span class='type-maker'><span class='type-maker'>}</span>]</span></div></li><li><div class='fold'><span class='field-name'>exclusions</span>: <span class='type-maker'>[<span class='type-name'>ExclusionCondition</span>]</span></div><div class='unfold'><span class='field-name'>exclusions</span>: <span class='type-maker'>[<span><span class='type-name'>ExclusionCondition</span><span class='spliter'>spec:</span><span class='type-maker'>Strict {</span></span></span><ul><li><div class='fold'><span class='field-name'>via</span>: <span class='type-maker'>[<span class='type-name'>DimensionName</span>]</span></div><div class='unfold'><span class='field-name'>via</span>: <span class='type-maker'>[<span><span class='type-name'>DimensionName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></span><span class='type-maker'>]</span></div></li><li><div class='fold'><span class='field-name'>positions</span>: <span class='type-maker'>[<span class='type-maker'>[<span class='type-name'>MemberName</span>]</span>]</span></div><div class='unfold'><span class='field-name'>positions</span>: <span class='type-maker'>[<span class='type-maker'>[<span><span class='type-name'>MemberName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></span></span><span class='type-maker'><span class='type-maker'>]</span>]</span></div></li></ul><span class='type-maker'><span class='type-maker'>}</span>]</span></div></li></ul><span class='type-maker'>}</span></div></li><li><div class='fold'><span class='field-name'>sort</span>: <span class='type-maker'>Map <span class='type-name'>DimensionName</span> <span class='type-name'>SortCondition</span></span></div><div class='unfold'><span class='field-name'>sort</span>: <span class='type-maker'>Map (</span><ul><li><div class='fold'><span class='meta-field'>key</span>: <span class='type-name'>DimensionName</span></div><div class='unfold'><span class='meta-field'>key</span>: <span><span class='type-name'>DimensionName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li><li><div class='fold'><span class='meta-field'>value</span>: <span class='type-name'>SortCondition</span></div><div class='unfold'><span class='meta-field'>value</span>: <span><span class='type-name'>SortCondition</span><span class='spliter'>spec:</span><span class='type-maker'>Strict {</span></span><ul><li><span class='field-name'>asc</span>: <span class='type-maker'>Boolean</span></li><li><div class='fold'><span class='field-name'>by</span>: <span class='type-maker'>Either {measure: Measure, expr: ValueExpr}</span></div><div class='unfold'><span class='field-name'>by</span>: <span class='type-maker'>Strict {</span><ul><li><div class='fold'><span class='field-name'>measure</span>: <span class='type-name'>Measure</span></div><div class='unfold'><span class='field-name'>measure</span>: <span><span class='type-name'>Measure</span><span class='spliter'>spec:</span><span class='type-maker'>Strict {</span></span><ul><li><div class='fold'><span class='field-name'>name</span>: <span class='type-name'>MeasureName</span></div><div class='unfold'><span class='field-name'>name</span>: <span><span class='type-name'>MeasureName</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li><li><span class='field-name'>aggregator</span>: <span class='type-maker'>Enum [\"sum\",\"avg\",\"max\",\"min\"]</span></li></ul><span class='type-maker'>}</span></div></li><li><div class='fold'><span class='field-name'>expr</span>: <span class='type-name'>ValueExpr</span></div><div class='unfold'><span class='field-name'>expr</span>: <span><span class='type-name'>ValueExpr</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></div></li></ul><span class='type-maker'>}</span></div></li><li><div class='fold'><span class='field-name'>where</span>: <span class='type-maker'>Maybe <span class='type-name'>ConditionExpr</span></span></div><div class='unfold'><span class='field-name'>where</span>: <span class='type-maker'>Maybe <span><span class='type-name'>ConditionExpr</span><span class='spliter'>spec:</span><span class='type-maker'>String</span></span></span></div></li></ul><span class='type-maker'>}</span></div></li></ul><span class='type-maker'>)</span></div></li></ul><span class='type-maker'>}</span></div></div>\n<div class='sample'>\n<span class='spliter'>sample:</span><pre>{\n    \"filter\": {\n        \"dimensions\": {\n            \"date\": {\n                \"select\": [\n                    \"2013\"\n                ],\n                \"match\": {\n                    \"contains\": \"abc\"\n                },\n                \"condition\": {\n                    \"limit\": {\n                        \"measure\": {\n                            \"name\": \"sale\",\n                            \"aggregator\": \"sum\"\n                        },\n                        \"comparator\": \"=\",\n                        \"value\": 3.14\n                    }\n                },\n                \"top\": {\n                    \"count\": 3.14,\n                    \"by\": {\n                        \"measure\": {\n                            \"name\": \"sale\",\n                            \"aggregator\": \"sum\"\n                        }\n                    }\n                }\n            },\n            \"product_type\": {\n                \"select\": [\n                    \"2013\"\n                ],\n                \"match\": {\n                    \"contains\": \"abc\"\n                },\n                \"condition\": {\n                    \"limit\": {\n                        \"measure\": {\n                            \"name\": \"sale\",\n                            \"aggregator\": \"sum\"\n                        },\n                        \"comparator\": \"=\",\n                        \"value\": 3.14\n                    }\n                },\n                \"top\": {\n                    \"count\": 3.14,\n                    \"by\": {\n                        \"measure\": {\n                            \"name\": \"sale\",\n                            \"aggregator\": \"sum\"\n                        }\n                    }\n                }\n            }\n        },\n        \"measures\": [\n            {\n                \"measure\": {\n                    \"name\": \"sale\",\n                    \"aggregator\": \"sum\"\n                },\n                \"limit\": {\n                    \"minBound\": null,\n                    \"maxBound\": null\n                }\n            }\n        ],\n        \"inclusions\": [\n            {\n                \"via\": [\n                    \"date\"\n                ],\n                \"positions\": [\n                    [\n                        \"2013\"\n                    ]\n                ]\n            }\n        ],\n        \"exclusions\": [\n            {\n                \"via\": [\n                    \"date\"\n                ],\n                \"positions\": [\n                    [\n                        \"2013\"\n                    ]\n                ]\n            }\n        ]\n    },\n    \"sort\": {\n        \"date\": {\n            \"asc\": true,\n            \"by\": {\n                \"measure\": {\n                    \"name\": \"sale\",\n                    \"aggregator\": \"sum\"\n                }\n            },\n            \"where\": null\n        },\n        \"product_type\": {\n            \"asc\": true,\n            \"by\": {\n                \"measure\": {\n                    \"name\": \"sale\",\n                    \"aggregator\": \"sum\"\n                }\n            },\n            \"where\": null\n        }\n    }\n}</pre></div></div>"}, ".typespec {\n\tfont-family: monospace;\n\tfont-size: 16px;\n\tborder-width: 4px;\n\tborder-color: rgba(165, 230, 229, 0.24);\n\tborder-style: ridge;\n}\n.typespec>div, .typespec>pre {\n\tmargin: 0.6em\n}\n.typespec .unfolded>.fold, .typespec .folded>.unfold {\n\tdisplay: none\n}\n.typespec ul {\n\tlist-style-type: none;\n\tpadding: 0px;\n\tmargin: 0px 0px 0px 2em;\n}\n.typespec .meta-field {\n\tfont-weight: bold;\n\tcolor: gray\n}\n.typespec .field-name {\n\tfont-weight: bold;\n\tcolor: #87BFB8\n}\n.typespec .fold>.field-name, .typespec .unfold>.field-name {\n\tcursor: help\n}\n.typespec .type-name {\n\tcolor: blue;\n\tcursor: help\n}\n.typespec .type-maker {\n\tcolor: #223497\n}\n.typespec .spliter {\n\tdisplay: inline-block;\n\tcolor: gray;\n\tpadding: 0 0.5em 0 0\n}\n.typespec .type-name~.spliter {\n\tpadding: 0 0.5em\n}\n.typespec .sample pre {\n\tmargin: 0;\n\tcolor: green;\n\tmax-height: 10em;\n\toverflow: auto;\n}")