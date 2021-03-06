<?php
/**
 * @package snow-monkey
 * @author inc2734
 * @license GPL-2.0+
 */

use Inc2734\WP_Customizer_Framework\Customizer_Framework;

$customizer = Customizer_Framework::init();

$customizer->panel( 'seo-sns', array(
	'title'    => __( 'SEO/SNS', 'snow-monkey' ),
	'priority' => 1000,
) );
