import { WatchlistRepository, FindWatchlistQuery } from 'repositories/watchlist';
import { Watchlist } from 'entities/watchlist';

export class SpaceService {
    constructor(private watchlistRepository: WatchlistRepository) {}

    async createWatchlist(watchlistToInsert: Partial<Watchlist>): Promise<Watchlist> {
        let watchlist: Watchlist = this.watchlistRepository.create(watchlistToInsert);
        watchlist = await this.watchlistRepository.insertWatchlist(watchlist);

        return watchlist;
    }

    async getWatchlist(watchlistQuery: FindWatchlistQuery): Promise<Watchlist[]> {
        const watchlists = await this.watchlistRepository.findByQuery(watchlistQuery);
        return watchlists;
    }
}
