<?php

/* this will help to cache js in client side and also help to busted cache */
define('CUSTOM_TAGSUGGESTION_VERSION', '1.0.0');
require_once QA_INCLUDE_DIR.'qa-app-admin.php';
require_once QA_INCLUDE_DIR.'qa-app-options.php';

class qa_custom_tagsuggestion {
    var $path;
    var $urltoroot;

    function allow_template($template)
    {
        return ($template=='ask');
    }

    function load_module($path, $urltoroot)
    {
        $this->path = $path;
        $this->urltoroot = $urltoroot;
    }

    function allow_region($region)
    {
        return true;
    }

    function output_widget($region, $place, $themeobject, $template, $request, $qa_content)
    {
      if((bool)qa_post_text('enabled_custom_tagsuggestion')){
        $html = '<script src="'.$this->urltoroot.'customtagsuggestion.js?'. CUSTOM_TAGSUGGESTION_VERSION .'"></script>';
        $html .= '<style>
                    .qa-sidebar{display: none;}
                    #tag_hints{
                        position: absolute;
                    }
                    .tag-suggestion{
                      width: 200px;
                      padding:0px;
                      margin:0px;
                      height: auto;
                      overflow:hidden;
                      border: 1px solid #8e8e8e;
                      z-index:99992;
                      background: #FBFBFB;
                      position: absolute;
                      border-radius: 3px;
                    }

                    .tag-suggestion li{
                       margin: 0px;
                       padding: 0px;
                       text-decoration: none;
                       list-style-type: none;
                    }

                    .tag-suggestion li a{
                       float: left;
                       width: 200px;
                       height:25px;
                       border-bottom: 1px solid #8e8e8e;
                       padding:0 0 0 10px;
                       overflow: hidden;
                       color: #000;
                       text-decoration: none;
                       margin: 3px 0;
                       font-size: helvetica, arial, sans-serif;
                    }

                    .tag-suggestion li:last-child a{
                        border-bottom: 0px !important;
                    }

                     li.selected a{
                      text-decoration: none;
                      color: #fff !important;
                      background: #6D84B4;
                      list-style-type: none;
                    }
                </style>';

         $html .= '<div id="tagsSuggestion" class="suggestion_content"></div>' ;
         $themeobject->output($html);
      }

    }

    function admin_form(&$qa_content)
    {
        require_once QA_INCLUDE_DIR.'qa-app-admin.php';
        $saved=false;

        if (qa_clicked('plugin_tagsuggestion_save_button')) {
            qa_opt('enabled_custom_tagsuggestion', (bool)qa_post_text('enabled_custom_tagsuggestion'));
            $saved=true;
        }

        return array(
            'ok' => $saved ? 'Custom Tag Suggestion Save' : null,

            'fields' => array(

                array(
                    'label' => 'Enable Custom Tag Suggestion in Aks Page',
                    'type' => 'checkbox',
                    'value' => (bool) qa_opt('enabled_custom_tagsuggestion'),
                    'suffix' => '',
                    'tags' => 'name="enabled_custom_tagsuggestion"',
                ),
            ),

            'buttons' => array(
                array(
                    'label' => 'Save Changes',
                    'tags' => 'NAME="plugin_tagsuggestion_save_button"',
                ),
            ),
        );
    }

    function option_default($option) {
      switch($option) {
        case 'enabled_custom_tagsuggestion':
           return false;
        default:
          return null;
      }
    }

}
