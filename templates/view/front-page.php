<?php
/**
 * @package snow-monkey
 * @author inc2734
 * @license GPL-2.0+
 */
?>
<article <?php post_class(); ?>>
	<?php get_template_part( 'template-parts/main-visual' ); ?>

	<?php get_template_part( 'template-parts/front-page-widget-area-top' ); ?>

	<?php
	ob_start();
	the_content();
	$content = ob_get_clean();
	?>
	<?php if ( $content ) : ?>
		<div class="c-section">
			<div class="c-container">
				<?php the_content(); ?>
			</div>
		</div>
	<?php endif; ?>

	<?php
	if ( get_theme_mod( 'display-static-front-page-recent-posts' ) ) {
		get_template_part( 'template-parts/recent-posts' );
	}
	?>

	<?php get_template_part( 'template-parts/front-page-widget-area-bottom' ); ?>
</article>
