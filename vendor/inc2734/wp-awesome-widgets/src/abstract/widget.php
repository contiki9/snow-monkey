<?php
/**
 * @package inc2734/wp-awesome-widgets
 * @author inc2734
 * @license GPL-2.0+
 */

/**
 * Abstract widget
 */
class Inc2734_WP_Awesome_Widgets_Abstract_Widget extends WP_Widget {

	/**
	 * @var array
	 */
	protected $_defaults = [];

	/**
	 * @var string
	 */
	protected $_path;

	public function __construct( $id_base, $name ) {
		$this->_path = __DIR__;

		if ( ! function_exists( 'wpvc_get_template_part' ) ) {
			$path = get_theme_file_path( '/vendor/inc2734/wp-view-controller/src/App/template-tags/get-template-part.php' );
			if ( file_exists( $path ) ) {
				require_once( $path );
			} else {
				require_once( __DIR__ . '/../../wp-view-controller/src/App/template-tags/get-template-part.php' );
			}
		}

		parent::__construct( false, $name );
	}

	public function widget( $args, $instance ) {
		$instance = shortcode_atts( $this->_defaults, $instance );
		$this->_render_widget( $args, $instance );
	}

	public function form( $instance ) {
		$instance = shortcode_atts( $this->_defaults, $instance );
		$this->_render_form( $instance );
	}

	protected function _render_widget( $args, $instance ) {
		$widget_templates = apply_filters( 'inc2734_wp_awesome_widgets_widget_templates', 'templates/widget' );
		if ( locate_template( $widget_templates . '/' . basename( $this->_path ) . '.php', false ) ) {
			wpvc_get_template_part( $widget_templates . '/' . basename( $this->_path ), [
				'args'     => $args,
				'instance' => $instance,
			] );
			return;
		}

		$file = $this->_path . '/_widget.php';
		if ( ! file_exists( $file ) ) {
			return;
		}

		include( $file );
	}

	protected function _render_form( $instance ) {
		$file = $this->_path . '/_form.php';
		if ( ! file_exists( $file ) ) {
			return;
		}

		include( $file );
	}
}