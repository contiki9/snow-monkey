<?php
/**
 * @package snow-monkey
 * @author inc2734
 * @license GPL-2.0+
 */

if ( ! is_active_sidebar( 'front-page-top-widget-area' ) ) {
	return;
}
?>

<div class="l-front-page-widget-area l-front-page-widget-area--top">
	<?php dynamic_sidebar( 'front-page-top-widget-area' ); ?>
</div>
