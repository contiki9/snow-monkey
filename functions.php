<?php
/**
 * @package snow-monkey
 * @author inc2734
 * @license GPL-2.0+
 */

use Inc2734\Mimizuku_Core\Core;

/**
* Uses composer autoloader
*/
require_once( get_theme_file_path( '/vendor/autoload.php' ) );

/**
 * Make theme available for translation
 *
 * @return void
 */
load_theme_textdomain( 'snow-monkey', get_template_directory() . '/languages' );

/**
 * Loads snow-monkey Bootstrap
 */
new Core();

/**
 * Sets the content width in pixels, based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = apply_filters( 'snow_monkey_content_width', 1152 );
}

/**
 * Loads theme setup files
 */
$includes = [
	'/app/setup',
	'/app/customizer',
	'/app/widget/*',
];
foreach ( $includes as $include ) {
	foreach ( glob( __DIR__ . $include . '/*.php' ) as $file ) {
		if ( 0 === strpos( basename( $file ), '_' ) ) {
			continue;
		}

		$template_name = str_replace( array( trailingslashit( __DIR__ ), '.php' ), '', $file );
		get_template_part( $template_name );
	}
}

/**
 * Returns array of page templates for layout selector in customizer
 *
 * @return array
 *           @var string Template slug  e.g. right-sidebar
 *           @var string Template name  e.g. Right Sidebar
 */
function snow_monkey_get_page_templates() {
	$wrappers = [];

	foreach ( wpvc_config( 'layout' ) as $wrapper_dirs ) {
		foreach ( glob( get_theme_file_path( $wrapper_dirs . '/*' ) ) as $file ) {
			$name = rtrim( basename( $file ), '.php' );
			if ( 'blank' === $name || 'wrapper' === $name ) {
				continue;
			}

			$page_template_path = null;
			$template_name = wpvc_locate_template( (array) wpvc_config( 'page-templates' ), $name );
			if ( $template_name ) {
				$page_template_path = get_theme_file_path( $template_name . '.php' );

				$page_template_data = get_file_data( $page_template_path, [
					'template-name' => 'Template Name',
				] );
			}

			$template_name = $name;
			if ( ! empty( $page_template_data ) && ! empty( $page_template_data['template-name'] ) ) {
				$template_name = $page_template_data['template-name'];
			}

			// @codingStandardsIgnoreStart
			$wrappers[ $name ] = __( $template_name, 'snow-monkey' );
			// @codingStandardsIgnoreEnd
		}
	}

	return $wrappers;
}

/**
 * Returns public post type objects
 *
 * @return array
 */
function snow_monkey_get_public_post_types() {
	$_post_types = get_post_types( [
		'public' => true,
	] );
	unset( $_post_types['attachment'] );

	$post_types = [];
	foreach ( $_post_types as $post_type ) {
		$post_types[ $post_type ] = get_post_type_object( $post_type );
	}

	return $post_types;
}
