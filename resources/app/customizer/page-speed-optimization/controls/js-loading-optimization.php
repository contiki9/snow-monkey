<?php
/**
 * @package snow-monkey
 * @author inc2734
 * @license GPL-2.0+
 */

use Inc2734\WP_Customizer_Framework\Customizer_Framework;

$customizer = Customizer_Framework::init();
$section    = $customizer->get_section( 'page-speed-optimization' );

$customizer->control( 'checkbox', 'js-loading-optimization', [
	'label'    => __( 'Optimize the Snow Monkey JavaScript loading', 'snow-monkey' ),
	'priority' => 100,
	'default'  => true,
] );

$control = $customizer->get_control( 'js-loading-optimization' );
$control->join( $section );
