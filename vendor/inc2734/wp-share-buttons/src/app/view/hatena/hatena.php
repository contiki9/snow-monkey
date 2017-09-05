<div id="wp-share-buttons-hatena-<?php echo esc_attr( $post_id ); ?>"
	class="wp-share-button wp-share-button--<?php echo esc_attr( $type ); ?> wp-share-button--hatena"
	data-wp-share-buttons-postid="<?php echo esc_attr( $post_id ); ?>"
	data-wp-share-buttons-has-cache="<?php echo esc_attr( $has_cache ); ?>"
>
	<?php if ( 'icon' !== $type ) : ?>
		<div class="wp-share-button__count">
			<?php echo esc_html( $count ); ?>
		</div>
	<?php endif; ?>
	<a class="wp-share-button__button" href="http://b.hatena.ne.jp/add?mode=confirm&amp;url=<?php the_permalink( $post_id ); ?>" target="_blank">
		<span class="wp-share-button__icon wp-share-button__icon--hatena"></span>
		<span class="wp-share-button__label"><?php esc_html_e( 'Bookmark', 'inc2734-wp-share-buttons' ); ?></span>
	</a>
</div>