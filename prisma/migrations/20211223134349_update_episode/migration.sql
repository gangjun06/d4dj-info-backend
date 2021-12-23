-- AddForeignKey
ALTER TABLE "UnitEpisode" ADD CONSTRAINT "UnitEpisode_id_fkey" FOREIGN KEY ("id") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEpisode" ADD CONSTRAINT "EventEpisode_id_fkey" FOREIGN KEY ("id") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterEpisode" ADD CONSTRAINT "CharacterEpisode_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterEpisode" ADD CONSTRAINT "CharacterEpisode_id_fkey" FOREIGN KEY ("id") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
