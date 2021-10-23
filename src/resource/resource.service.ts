import {
  AttributeForParse,
  Card,
  Character,
  Skill,
  Unit,
} from '@/character/character';
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
import prisma, { Attribute, Prisma } from '@prisma/client';
import axios from 'axios';
import { Resource, ResourceType } from './resource';

@Injectable()
export class ResourceService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  // ex) StartDate -> startDate
  private formatText(str: string): string {
    const splited = str.replace(/__/gi, '').split('');
    return splited[0].toLowerCase() + splited.slice(1).join('');
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

  async getResources(target: ResourceType): Promise<void> {
    const baseUrl = this.configService.get<string>('BASE_FILE_URL') + 'Master';
    if (target === ResourceType.Music) {
      {
        const res = await axios.get(`${baseUrl}/ChartDesignerMaster.json`);
        const result = this.parse<ChartDesigner>(res.data);

        await this.prismaService.chartDesigner.createMany({
          data: result.map<prisma.ChartDesigner>((item) =>
            ChartDesigner.prismaSchema(item),
          ),
          skipDuplicates: true,
        });
      }
      {
        const res = await axios.get(`${baseUrl}/MusicMaster.json`);
        const result = this.parse<Music>(res.data);
        await this.prismaService.music.createMany({
          data: result.map<prisma.Music>((item) => Music.prismaSchema(item)),
          skipDuplicates: true,
        });
      }
      {
        const res = await axios.get(`${baseUrl}/MusicMixMaster.json`);
        const result = this.parse<MusicMix>(res.data);

        await this.prismaService.musicMix.deleteMany({});
        await this.prismaService.musicMix.createMany({
          data: result.map<prisma.MusicMix>((item) =>
            MusicMix.prismaSchema(item),
          ),
        });
      }
      {
        const res = await axios.get(`${baseUrl}/ChartMaster.json`);
        const result = this.parse<Chart>(res.data);
        await this.prismaService.chart.createMany({
          data: result.map<prisma.Chart>((item) => Chart.prismaSchema(item)),
          skipDuplicates: true,
        });
      }
      {
        const res = await axios.get(`${baseUrl}/ChartNoteCountMaster.json`);
        const result = this.parse<ChartNoteCount>(res.data);
        await this.prismaService.chartNoteCount.deleteMany({});

        await this.prismaService.chartNoteCount.createMany({
          data: result.map<prisma.ChartNoteCount>((item) =>
            ChartNoteCount.prismaSchema(item),
          ),
        });
      }
    } else if (target === ResourceType.Character) {
      {
        const res = await axios.get(`${baseUrl}/SkillMaster.json`);
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
        const res = await axios.get(`${baseUrl}/UnitMaster.json`);
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
        const res = await axios.get(`${baseUrl}/CharacterMaster.json`);
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
        const res = await axios.get(`${baseUrl}/CardMaster.json`);
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
  }
}
