import {
  AttributeForParse,
  Card,
  Character,
  Skill,
  Unit,
} from '@/character/character';
import {
  CharacterEpisode,
  Episode,
  EventEpisode,
  Live2DUIChat,
  LiveResultEpisode,
  UnitEpisode,
} from '@/episode/episode';
import { Event, Gacha } from '@/event/event';
import { Reward, Stock, StockViewCategory } from '@/items/items';
import {
  Chart,
  ChartDesigner,
  ChartNoteCount,
  Music,
  MusicMix,
} from '@/music/music';
import { PrismaService } from '@/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import prisma, { MusicSection, Prisma } from '@prisma/client';
import axios from 'axios';
import { Resource, ResourceType } from './resource';

@Injectable()
export class ResourceService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private baseUrl = this.configService.get<string>('BASE_FILE_URL') + 'Master';

  // ex) StartDate -> startDate || BGMPath -> bgmpath
  private formatText(str: string): string {
    str = str.replace(/__/gi, '');
    const match = str.match(/^\b[A-Z]+/);
    if (match) {
      return str.replace(/^\b[A-Z]+/, match[0].toLowerCase());
    }
    return str;
  }

  private parse<T>(json: object): T[] {
    let newObj: T[] = [];
    Object.keys(json).forEach((key) => {
      let objItem: T = {} as T;
      Object.keys(json[key]).forEach((key2) => {
        objItem[this.formatText(key2)] = json[key][key2];
      });
      newObj.push(objItem as T);
    });
    return newObj;
  }

  private async parseMusic(): Promise<void> {
    let comboInfo: { [key: string]: { Count: number } }[];
    const getCombo = (id: number | string, type: MusicSection): number =>
      comboInfo[`(${id}, ${type})`]?.Count || -1;
    {
      const res = await axios.get(`${this.baseUrl}/ChartNoteCountMaster.json`);
      comboInfo = res.data;
      const result = this.parse<ChartNoteCount>(res.data);
      await this.prismaService.chartNoteCount.deleteMany({});
      await this.prismaService.chartNoteCount.createMany({
        data: result.map<prisma.ChartNoteCount>((item) =>
          ChartNoteCount.prismaSchema(item),
        ),
      });
    }
    {
      const res = await axios.get(`${this.baseUrl}/ChartDesignerMaster.json`);
      const result = this.parse<ChartDesigner>(res.data);

      await this.prismaService.chartDesigner.createMany({
        data: result.map<prisma.ChartDesigner>((item) =>
          ChartDesigner.prismaSchema(item),
        ),
        skipDuplicates: true,
      });
    }
    {
      const res = await axios.get(`${this.baseUrl}/MusicMaster.json`);
      const result = this.parse<Music>(res.data);
      await this.prismaService.music.createMany({
        data: result.map<prisma.Music>((item) => Music.prismaSchema(item)),
        skipDuplicates: true,
      });
    }
    {
      const res = await axios.get(`${this.baseUrl}/MusicMixMaster.json`);
      const result = this.parse<MusicMix>(res.data);

      await this.prismaService.musicMix.deleteMany({});
      await this.prismaService.musicMix.createMany({
        data: result.map<prisma.MusicMix>((item) =>
          MusicMix.prismaSchema(item),
        ),
      });
    }
    {
      const res = await axios.get(`${this.baseUrl}/ChartMaster.json`);
      const result = this.parse<Chart>(res.data);
      await this.prismaService.chart.createMany({
        data: result.map<prisma.Chart>((item) =>
          Chart.prismaSchema({
            ...item,
            noteCount: getCombo(item.id, MusicSection.Full),
          }),
        ),
        skipDuplicates: true,
      });
    }
  }

  private async parseCharacter(): Promise<void> {
    {
      const res = await axios.get(`${this.baseUrl}/SkillMaster.json`);
      const result = this.parse<Skill>(res.data);
      let insertData: Prisma.SkillCreateManyInput[] = [];

      result.forEach((item) => {
        insertData.push(Skill.prismaSchema(item));
      });

      await this.prismaService.skill.createMany({
        data: insertData,
        skipDuplicates: true,
      });
    }
    {
      const res = await axios.get(`${this.baseUrl}/UnitMaster.json`);
      const result = this.parse<Unit>(res.data);
      let insertData: Prisma.UnitCreateManyInput[] = [];

      result.forEach((item) => {
        insertData.push(Unit.prismaSchema(item));
      });

      await this.prismaService.unit.createMany({
        data: insertData,
        skipDuplicates: true,
      });
    }
    {
      const res = await axios.get(`${this.baseUrl}/CharacterMaster.json`);
      const result = this.parse<Character>(res.data);
      let insertData: Prisma.CharacterCreateManyInput[] = [];

      result.forEach((item) => {
        insertData.push(Character.prismaSchema(item));
      });
      await this.prismaService.character.createMany({
        data: insertData,
        skipDuplicates: true,
      });
    }
    {
      const res = await axios.get(`${this.baseUrl}/CardMaster.json`);
      const result = this.parse<Card>(res.data);
      let insertData: Prisma.CardCreateManyInput[] = [];

      result.forEach((item) => {
        insertData.push(Card.prismaSchema(item));
      });
      await this.prismaService.card.createMany({
        data: insertData,
        skipDuplicates: true,
      });
    }
  }

  private async parseEvent(): Promise<void> {
    {
      const res = await axios.get(`${this.baseUrl}/EventMaster.json`);
      const result = this.parse<Event>(res.data);
      const list = result.map<prisma.Event>((item) => Event.prismaSchema(item));
      for (let item of list) {
        await this.prismaService.event.upsert({
          where: { id: item.id },
          update: {},
          create: item,
        });
      }
    }
    {
      const res = await axios.get(`${this.baseUrl}/GachaMaster.json`);
      const result = this.parse<Gacha>(res.data);
      const list = result.map<prisma.Gacha>((item) => Gacha.prismaSchema(item));
      for (let item of list) {
        await this.prismaService.gacha.upsert({
          where: { id: item.id },
          update: {},
          create: item,
        });
      }
    }
  }

  private async parseEpisode(): Promise<void> {
    {
      const res = await axios.get(`${this.baseUrl}/EpisodeMaster.json`);
      const result = this.parse<Episode>(res.data);
      await this.prismaService.episode.createMany({
        data: result.map<prisma.Episode>((item) => Episode.prismaSchema(item)),
        skipDuplicates: true,
      });
    }
    {
      const res = await axios.get(`${this.baseUrl}/EventEpisodeMaster.json`);
      const result = this.parse<EventEpisode>(res.data);
      await this.prismaService.eventEpisode.createMany({
        data: result.map<prisma.EventEpisode>((item) =>
          EventEpisode.prismaSchema(item),
        ),
        skipDuplicates: true,
      });
    }
    {
      const res = await axios.get(`${this.baseUrl}/UnitEpisodeMaster.json`);
      const result = this.parse<UnitEpisode>(res.data);
      await this.prismaService.unitEpisode.createMany({
        data: result.map<prisma.UnitEpisode>((item) =>
          UnitEpisode.prismaSchema(item),
        ),
        skipDuplicates: true,
      });
    }
    {
      const res = await axios.get(
        `${this.baseUrl}/CharacterEpisodeMaster.json`,
      );
      const result = this.parse<CharacterEpisode>(res.data);
      await this.prismaService.characterEpisode.createMany({
        data: result.map<prisma.CharacterEpisode>((item) =>
          CharacterEpisode.prismaSchema(item),
        ),
        skipDuplicates: true,
      });
    }
    {
      const res = await axios.get(
        `${this.baseUrl}/LiveResultEpisodeMaster.json`,
      );
      const result = this.parse<LiveResultEpisode>(res.data);
      await this.prismaService.liveResultEpisode.createMany({
        data: result.map<prisma.LiveResultEpisode>((item) =>
          LiveResultEpisode.prismaSchema(item),
        ),
        skipDuplicates: true,
      });
    }
    {
      const res = await axios.get(`${this.baseUrl}/Live2DUIChatMaster.json`);
      const result = this.parse<Live2DUIChat>(res.data);
      await this.prismaService.live2DUIChat.createMany({
        data: result.map<prisma.Live2DUIChat>((item) =>
          Live2DUIChat.prismaSchema(item),
        ),
        skipDuplicates: true,
      });
    }
  }

  private async parseItems(): Promise<void> {
    {
      const res = await axios.get(
        `${this.baseUrl}/StockViewCategoryMaster.json`,
      );
      const result = this.parse<StockViewCategory>(res.data);
      await this.prismaService.stockViewCategory.createMany({
        data: result.map<prisma.StockViewCategory>((item) =>
          StockViewCategory.prismaSchema(item),
        ),
        skipDuplicates: true,
      });
    }
    {
      const res = await axios.get(`${this.baseUrl}/StockMaster.json`);
      const result = this.parse<Stock>(res.data);
      await this.prismaService.stock.createMany({
        data: result.map<prisma.Stock>((item) => Stock.prismaSchema(item)),
        skipDuplicates: true,
      });
    }
    {
      const res = await axios.get(`${this.baseUrl}/RewardMaster.json`);
      const result = this.parse<Reward>(res.data);
      await this.prismaService.reward.createMany({
        data: result.map<prisma.Reward>((item) => Reward.prismaSchema(item)),
        skipDuplicates: true,
      });
    }
  }

  async getResources(target: ResourceType): Promise<void> {
    if (target === ResourceType.Music) this.parseMusic();
    else if (target === ResourceType.Character) this.parseCharacter();
    else if (target === ResourceType.Event) this.parseEvent();
    else if (target === ResourceType.Items) this.parseItems();
    else if (target === ResourceType.Episode) this.parseEpisode();
  }
}
