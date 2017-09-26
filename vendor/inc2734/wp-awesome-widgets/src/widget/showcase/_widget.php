<?php
/**
 * @package inc2734/wp-awesome-widgets
 * @author inc2734
 * @license GPL-2.0+
 */
?>

<?php echo wp_kses_post( $args['before_widget'] ); ?>

	<div
		class="wpaw-showcase"
		id="wpaw-showcase-<?php echo esc_attr( $args['widget_id'] ); ?>"
		style="background-image: url(<?php echo esc_url( wp_get_attachment_image_url( $instance['bg-image'], 'large' ) ); ?> );"
		>

		<div class="wpaw-showcase__mask"
			style="background-color: <?php echo sanitize_hex_color( $instance['mask-color'] ); ?>; opacity: <?php echo esc_attr( $instance['mask-opacity'] ); ?>"
		></div>

		<div class="wpaw-showcase__inner wpaw-showcase__inner--align-<?php echo esc_attr( $instance['text-align'] ); ?> wpaw-showcase__inner--thumbnail-align-<?php echo esc_attr( $instance['thumbnail-align'] ); ?>">

			<div class="wpaw-showcase__body">
				<?php if ( ! empty( $instance['title'] ) ) : ?>
					<h2 class="wpaw-showcase__title"><?php echo esc_html( $instance['title'] ); ?></h2>
				<?php endif; ?>

				<?php if ( ! empty( $instance['lead'] ) ) : ?>
					<div class="wpaw-showcase__lead">
						<?php echo esc_html( $instance['lead'] ); ?>
					</div>
				<?php endif; ?>

				<?php if ( ! empty( $instance['link-url'] ) && ! empty( $instance['link-text'] ) ) : ?>
					<div class="wpaw-showcase__action">
						<a class="wpaw-showcase__more" href="<?php echo esc_url( $instance['link-url'] ); ?>"><?php echo esc_html( $instance['link-text'] ); ?></a>
					</div>
				<?php endif; ?>
			</div>

			<?php if ( ! empty( $instance['thumbnail'] ) ) : ?>
				<div class="wpaw-showcase__figure">
					<img src="<?php echo esc_url( wp_get_attachment_image_url( $instance['thumbnail'], 'large' ) ); ?>" alt="">
				</div>
			<?php endif; ?>

		</div>

	</div>

<?php echo wp_kses_post( $args['after_widget'] ); ?>
