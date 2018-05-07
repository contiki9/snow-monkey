<?php
/**
 * @package snow-monkey
 * @author inc2734
 * @license GPL-2.0+
 */

use Inc2734\WP_Customizer_Framework\Customizer_Framework;

$customizer = Customizer_Framework::init();
$section    = $customizer->get_section( 'page-speed-optimization' );

$customizer->control( 'checkbox', 'jquery-loading-optimization', [
	'label'       => __( 'Optimize the jQuery loading', 'snow-monkey' ),
	'description' => __( 'Depending on your plugins and child theme, JavaScript error may occur.', 'snow-monkey' ),
	'priority'    => 105,
	'default'     => false,
] );

$control = $customizer->get_control( 'jquery-loading-optimization' );
$control->join( $section );
