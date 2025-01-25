// If you find yourself always using the same command-line flag, you can set it
// here as a default.

module.exports = {
	/**
	 * WARNING! WARNING! WARNING! WARNING! WARNING! WARNING! WARNING!
	 *
	 * THE NEXT 8 OPTIONS CONTAIN POTENTIALLY SENSITIVE INFORMATION
	 * THERE IS A NOTE WHERE YOU WILL WANT TO START COPYING FROM
	 * IF YOU ARE TRYING TO SHARE YOUR CONFIGURATION SETTINGS!
	 *
	 * WARNING! WARNING! WARNING! WARNING! WARNING! WARNING! WARNING!
	 **/

	/**
	 * Provide your own API key here to override the autogenerated one.
	 * Not recommended - prefer using the autogenerated API key via
	 * `cross-seed api-key`.
	 * Must be 24+ characters.
	 */
	apiKey: process.env.CROSS_SEED_API_KEY,

	/**
	 * List of Torznab URLs.
	 * For Jackett, click "Copy RSS feed".
	 * For Prowlarr, click on the indexer name and copy the Torznab Url, then
	 * append "?apikey=YOUR_PROWLARR_API_KEY". Wrap each URL in quotation marks
	 * and separate them with commas, and surround the entire set in brackets.
	 */
	torznab: process.env.CROSS_SEED_TORZNAB_URLS.split(",").map((url) =>
		url.replaceAll("PROWLARR_API_KEY", process.env.CROSS_SEED_PROWLARR_API_KEY),
	),

	/**
	 * URL(s) to your Sonarr instance(s), included in the same way as torznab
	 * URLs but for your Sonarr: note that api is not at the end. see below.
	 *
	 * You should order these in most likely to match -> the least likely order.
	 * They are searched sequentially as they are listed.
	 *
	 * This apikey parameter comes from Sonarr
	 *
	 * Example: sonarr: ["http://sonarr:8989/?apikey=12345"],
	 *
	 *      sonarr: ["http://sonarr:8989/?apikey=12345",
	 *               "http://sonarr4k:8989/?apikey=12345"],
	 */
	sonarr: [
		`http://sonarr:8989/?apikey=${process.env.CROSS_SEED_SONARR_API_KEY}`,
	],

	/**
	 * URL(s) to your Radarr instance(s), included in the same way as torznab
	 * URLs but for your Radarr: note that api is not at the end. see below.
	 *
	 * You should order these in most likely to match -> the least likely order.
	 * They are searched sequentially as they are listed.
	 *
	 * This apikey parameter comes from Radarr
	 *
	 * Example: radarr: ["http://radarr:7878/?apikey=12345"],
	 *
	 *       radarr: ["http://radarr:7878/?apikey=12345",
	 *                "http://radarr4k:7878/?apikey=12345"],
	 */
	radarr: [
		`http://radarr:7878/?apikey=${process.env.CROSS_SEED_RADARR_API_KEY}`,
	],

	/**
	 * Bind to a specific host address.
	 * Example: "127.0.0.1"
	 * Default is "0.0.0.0"
	 */
	host: undefined,

	/**
	 * The port you wish to listen on for daemon mode.
	 */
	port: 2468,

	/**
	 * cross-seed will send POST requests to these urls with a JSON payload of
	 * { title, body, extra }. Conforms to the caronc/apprise REST API.
	 */
	notificationWebhookUrls: [],

	/**
	 * The url of your rtorrent XMLRPC interface.
	 * Only relevant with action: "inject".
	 * Could be something like "http://username:password@localhost:1234/RPC2
	 */
	rtorrentRpcUrl: undefined,

	/**
	 * The url of your qBittorrent webui.
	 * Only relevant with action: "inject".
	 *
	 * If using Automatic Torrent Management, please read:
	 * https://www.cross-seed.org/docs/v6-migration#qbittorrent
	 *
	 * Supply your username and password inside the url like so:
	 * "http://username:password@localhost:8080"
	 */
	qbittorrentUrl: undefined,

	/**
	 * The url of your Transmission RPC interface.
	 * Usually ends with "/transmission/rpc".
	 * Only relevant with action: "inject".
	 * Supply your username and password inside the url like so:
	 * "http://username:password@localhost:9091/transmission/rpc"
	 */
	transmissionRpcUrl: undefined,

	/**
	 * The url of your Deluge JSON-RPC interface.
	 * Usually ends with "/json".
	 * Only relevant with action: "inject".
	 * Supply your WebUI password as well like so:
	 * "http://:password@localhost:8112/json"
	 */
	delugeRpcUrl: undefined,

	/**
	 * END OF POTENTIALLY SENSITIVE CONFIGURATION OPTIONS
	 */

	/**
	 * Use the torrents already in your torrent client to find matches.
	 * This is the preferred method of cross-seeding, only set to false
	 * if you want to EXCLUSIVELY use dataDirs.
	 */
	useClientTorrents: true,

	/**
	 * Pause at least this many seconds in between each search. Higher is safer
	 * for you and friendlier for trackers.
	 * Minimum value of 30.
	 */
	delay: 30,

	/**
	 * Usually unnecessary: https://www.cross-seed.org/docs/v6-migration#data-based-matching-use-cases
	 * To search with already downloaded data, you can enter the directories
	 * to your downloaded torrent data to find matches, rather than relying
	 * entirely on the .torrent files themselves for matching.
	 *
	 * If directories are entered, they must all be in a single option, and they
	 * need to be surrounded by brackets.
	 *
	 * Windows users will need to use double backslash in all paths in this
	 * config.
	 *
	 * example:
	 *     dataDirs: ["/downloads/movies", "/downloads/packs"],
	 * or for Windows users
	 *     dataDirs: ["C:\\My Data\\Downloads\\Movies"],
	 */
	dataDirs: [],

	/**
	 * Defines what qBittorrent or Deluge category to set on linked torrents
	 *
	 * qBittorrent: If you have linking enabled, all torrents will be injected
	 * to this category.
	 *
	 * Default is "cross-seed-link".
	 */
	linkCategory: "cross-seed-link",

	/**
	 * cross-seed will create links to matched files in the specified directories.
	 * If using hardlinks, you will need as many linkDirs as drives/partion/volumes
	 * as your dataDirs and torrent client download directories.
	 *
	 * Ideally, you should only have a single linkDir and use drive pooling.
	 * Using multiple linkDirs should be reserved for setups with cache/temp drives
	 * or where drive pooling is impossible.
	 *
	 * If you are a Windows user you need to put double '\' (e.g. "C:\\links")
	 *
	 * IF YOU ARE USING HARDLINKS, THIS MUST BE UNDER THE SAME VOLUMES AS YOUR
	 * DATADIRS. THIS PATH MUST ALSO BE ACCESSIBLE VIA YOUR TORRENT CLIENT
	 * USING THE SAME PATH.
	 *
	 * https://www.cross-seed.org/docs/basics/options#linkdirs
	 */
	linkDirs: [],

	/**
	 * cross-seed will use links of this type to inject data-based matches into
	 * your client. We recommend reading the following page:
	 * https://www.cross-seed.org/docs/tutorials/linking
	 * Options: "symlink", "hardlink", "reflink".
	 */
	linkType: "hardlink",

	/**
	 * Enabling this will link files using v5's flat folder style.
	 *
	 * Each individual Torznab tracker's cross-seeds, otherwise, will have its
	 * own folder with the tracker's name and it's links within it.
	 *
	 * If using Automatic Torrent Management in qBittorrent, please read:
	 * https://www.cross-seed.org/docs/basics/options#flatlinking
	 *
	 * Default: false.
	 */
	flatLinking: false,

	/**
	 * Determines flexibility of naming during matching, all options will have
	 * no false positives. Using partial can double the amount of cross seeds found.
	 * Options: "safe", "risky", "partial".
	 *
	 * "safe" will allow only perfect name/size matches using the standard
	 * matching algorithm.
	 *
	 * "risky" uses filesize as its only comparison point.
	 *
	 * "partial" is like risky but allows matches if they are missing small
	 * files like .nfo/.srt.
	 *
	 * We recommend reading the following entries:
	 * https://www.cross-seed.org/docs/basics/options#matchmode
	 * https://www.cross-seed.org/docs/basics/faq-troubleshooting#my-partial-matches-from-related-searches-are-missing-the-same-data-how-can-i-only-download-it-once
	 */
	matchMode: "safe",

	/**
	 * Skip rechecking on injection if unnecessary. Certain matches, such as partial,
	 * will always be rechecked. Set to false to recheck all torrents before resuming.
	 */
	skipRecheck: true,

	/**
	 * The maximum size in bytes remaining for a torrent to be resumed.
	 * Must be in the range of 0 to 52428800 (50 MiB).
	 * https://www.cross-seed.org/docs/basics/faq-troubleshooting#my-partial-matches-from-related-searches-are-missing-the-same-data-how-can-i-only-download-it-once
	 */
	autoResumeMaxDownload: 52428800,

	/**
	 * Determines how deep into the specified dataDirs to go to generate new
	 * searchees. Setting this to higher values will result in more searchees
	 * and more API hits to your indexers.
	 * https://www.cross-seed.org/docs/tutorials/data-based-matching#setting-up-data-based-matching
	 */
	maxDataDepth: 3,

	/**
	 * Directory containing .torrent files. This is unnecessary with useClientTorrents.
	 * For qBittorrent, this is BT_Backup.
	 * For rtorrent, this is your session directory as configured in your
	 * .rtorrent.rc file.
	 * For Deluge, this is ~/.config/deluge/state.
	 * For Transmission, this would be ~/.config/transmission/torrents.
	 *
	 * If you are a Windows user you need to put double '\' (e.g. "C:\\torrents")
	 */
	torrentDir: null,

	/**
	 * Where to save the torrent files that cross-seed finds for you.
	 *
	 * If you are a Windows user you need to put double '\' (e.g. "C:\\output")
	 */
	outputDir: "/media/cross_seed_torrents",

	/**
	 * Whether to include single episode torrents in search/webhook/rss.
	 *
	 * This setting does not affect matching episodes from announce. Read more about usage:
	 * https://www.cross-seed.org/docs/v6-migration#updated-includesingleepisodes-behavior
	 */
	includeSingleEpisodes: false,

	/**
	 * Include torrents/data comprised of non-video files.
	 *
	 * If this option is set to false, any folders or torrents whose
	 * totalNonVideoFilesSize / totalSize > fuzzySizeThreshold
	 * will be excluded.
	 *
	 * For example, if you have .srt or .nfo files inside a torrent, using
	 * false will still allow the torrent to be considered for cross-seeding
	 * while disallowing torrents that are music, games, books, etc.
	 * For full disc based folders (not .ISO) you may wish to set this as true.
	 *
	 * To search for all video media except individual episodes, use:
	 *
	 *    includeSingleEpisodes: false
	 *    includeNonVideos: false
	 *
	 * To search for all video media including individual episodes, use:
	 *
	 *    includeSingleEpisodes: true
	 *    includeNonVideos: false
	 *
	 * To search for absolutely ALL types of content, including non-video,
	 * configure your episode settings based on the above examples and use:
	 *
	 *     includeNonVideos: true
	 */
	includeNonVideos: false,

	/**
	 * Match season packs from the individual episodes you already have.
	 * https://www.cross-seed.org/docs/basics/faq-troubleshooting#my-partial-matches-from-related-searches-are-missing-the-same-data-how-can-i-only-download-it-once
	 *
	 * null - disabled
	 * 1 - must have all episodes
	 * 0.8 - must have at least 80% of the episodes
	 */
	seasonFromEpisodes: 1,

	/**
	 * You should NOT modify this unless you have good reason.
	 * The following option is the preliminary value to compare sizes of
	 * releases for further comparison.
	 *
	 * decimal value (0.02 = 2%)
	 */
	fuzzySizeThreshold: 0.02,

	/**
	 * Time based options below use the following format:
	 * https://github.com/vercel/ms
	 */

	/**
	 * Exclude torrents or data first seen by cross-seed more than this long ago.
	 * Examples:
	 * "5 days"
	 * "2 weeks"
	 *
	 * This value must be in the range of 2-5 times your excludeRecentSearch
	 */
	excludeOlder: "2 weeks",

	/**
	 * Exclude torrents or data which has been searched more recently than this
	 * long ago.
	 *
	 * Doesn't exclude previously failed searches.
	 * Examples:
	 * "2 days"
	 * "5 days"
	 *
	 * This value must be 2-5x less than excludeOlder.
	 */
	excludeRecentSearch: "3 days",

	/**
	 * Which action to take upon a match being found.
	 * Options: "save", "inject".
	 */
	action: "inject",

	/**
	 * qBittorrent and Deluge specific.
	 * Whether to inject using the same labels/categories as the original
	 * torrent.
	 *
	 * qBittorrent (linking): The category will always be linkCategory.
	 * If set to true, a tag of category.cross-seed will be added.
	 *
	 * Example (Non-Linking): if you have an original label/category called
	 * "Movies", this will automatically inject cross-seeds to
	 * "Movies.cross-seed".
	 */
	duplicateCategories: false,

	/**
	 * Run rss scans on a schedule.
	 * Set to undefined or null to disable. Minimum of 10 minutes.
	 * Examples:
	 * "10 minutes"
	 * "1 hour"
	 */
	rssCadence: "30 minutes",

	/**
	 * Run searches on a schedule.
	 * Set to undefined or null to disable. Minimum of 1 day.
	 * Examples:
	 * "2 weeks"
	 * "3 days"
	 *
	 * This value must be at least 3x less than your excludeRecentSearch
	 */
	searchCadence: "1 day",

	/**
	 * Fail snatch requests that haven't responded after this long.
	 * Set to null for an infinite timeout.
	 * Examples:
	 * "30 seconds"
	 * null
	 */
	snatchTimeout: "30 seconds",

	/**
	 * Fail search requests that haven't responded after this long.
	 * Set to null for an infinite timeout.
	 * Examples:
	 * "30 seconds"
	 * null
	 */
	searchTimeout: "2 minutes",

	/**
	 * The number of searches (unique queries) to make in one run/batch per indexer.
	 * If more than this many searches are queued,
	 * "searchCadence" will determine how long until the next batch.
	 *
	 * Combine this with "excludeRecentSearch" and "searchCadence" to smooth
	 * long-term API usage patterns.
	 *
	 * Set to null for no limit.
	 */
	searchLimit: 400,

	/**
	 * Ignore torrents or data containing these properties:
	 * https://www.cross-seed.org/docs/basics/options#blocklist
	 */
	blockList: [],
};
