/**
 * seekIfAutoplay seeks to the provided timestamp if autoplay is enabled
 * @param player The player instance
 * @param playerVars The player vars
 */
export function seekIfAutoplay(player: YT.Player, playerVars: YT.PlayerVars) {
    if (playerVars.autoplay != undefined && playerVars.autoplay == YT.AutoPlay.AutoPlay) {
        player.mute();

        if (playerVars.start != undefined && playerVars.start != 0) {
            player.seekTo(playerVars.start, true);
        } else {
            player.playVideo();
        }
    }
}
