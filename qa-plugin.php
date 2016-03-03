<?php

/*
    Plugin Name: Siam Abdullah
    Plugin URI:
    Plugin Description: Custom tag suggesion and selection
    Plugin Version: 1.1.1
    Plugin Date: 2016-03-02
    Plugin Author: Question2Answer
    Plugin Author URI: http://www.question2answer.org/
    Plugin License: GPLv2
    Plugin Minimum Question2Answer Version: 1.3
    Plugin Update Check URI:
*/


if (!defined('QA_VERSION')) { // don't allow this page to be requested directly from browser
    header('Location: ../../');
    exit;
}


qa_register_plugin_module('widget', 'qa_custom_tagsuggestion.php', 'qa_custom_tagsuggestion', 'Custom Tag Suggestion');
