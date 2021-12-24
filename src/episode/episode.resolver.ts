import { Inject, Query } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { UnitEpisode } from './episode';
import { EpisodeService } from './episode.service';

@Resolver()
export class EpisodeResolver {
  constructor(@Inject(EpisodeService) private episodeService: EpisodeService) {}
}
