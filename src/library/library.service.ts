import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Library } from './entities/library.entity';
import cheerio from 'cheerio';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { HostService } from '../host/host.service';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name)
    private readonly libraryModel: Model<Library>,
    private readonly http: AxiosAdapter,
    private readonly hostService: HostService,
  ) {}

  findAll() {
    return this.libraryModel.find().select('-__v');
  }

  async getHostUrl(id: string) {
    const url = await (await this.hostService.findOne(id)).hostUrl;
    return url;
  }

  async getCataloguePolijic(finalKeyWord: string) {
    return new Promise(async (resolve, reject) => {
      if (!finalKeyWord) {
        return reject('Invalid data');
      }
      const hostUrl = await this.getHostUrl('6473f1c10bd4cdc48deb5179');
      const url =
        hostUrl +
        '/F/?func=find-b&request=' +
        finalKeyWord +
        '&find_code=WRD&adjacent=N&x=32&y=94=WFM&filter_request_4=&filter_code_5=WSL&filter_request_5=';
      const data = await this.http
        .get<any>(url)
        .catch((error) => resolve('No hay datos para la búsqueda realizada'));
      if (data) {
        const nameU = 'poli-jic';
        const universidad = 'Politécnico Colombiano Jaime Isaza Cadavid';
        const $ = cheerio.load(data);

        const records = [];
        const totalRecords = $('.text3[width="20%"]')
          .text()
          .trim()
          .substring(38, 44)
          .trim();

        $("table[cellspacing='2'] tr[valign='baseline']").each((i, element) => {
          const rank = i + 1;

          const titleStartingPosition = $(element)
            .find('td.td1:nth-child(5)')
            .html()
            .trim()
            .indexOf('=');

          const titleFinalPosition = $(element)
            .find('td.td1:nth-child(5)')
            .html()
            .trim()
            .indexOf(';');

          const title = $(element)
            .find('td.td1:nth-child(5)')
            .html()
            .trim()
            .substring(titleStartingPosition + 2, titleFinalPosition - 1);

          const autor = $(element).find('td.td1:nth-child(3)').text().trim();

          const link = $(element).find('td.td1:nth-child(1) a').attr('href');

          const metadata = {
            rank: rank,
            title: title,
            author: autor,
            detail: link,
          };

          records.push(metadata);
        });

        if (records.length != 0) {
          const jsonCatalogue = {
            url,
            totalRecords,
            nameU,
            records,
            universidad,
          };
          resolve(jsonCatalogue);
        } else {
          resolve('No hay datos para la búsqueda realizada');
        }
      } else {
        resolve('No hay datos para la búsqueda realizada');
      }
    });
  }

  async getCatalogueUdea(finalKeyWord: string) {
    return new Promise(async (resolve, reject) => {
      if (!finalKeyWord) {
        return reject('Invalid data');
      }
      const hostUrl = await this.getHostUrl('6473f1fe0bd4cdc48deb517b');

      const url =
        hostUrl +
        '/cgi-olib/?keyword=' +
        finalKeyWord +
        '&session=10442211&nh=20&infile=presearch.glue';

      const nameU = 'udea';
      const universidad = 'Universidad de Antioquia';
      const data = await this.http
        .get<any>(url)
        .catch((error) => resolve('No hay datos para la búsqueda realizada'));
      if (data) {
        const $ = cheerio.load(data);
        const records = [];
        const totalRecords = $('.number-of-hits font').text();

        $('.hitlist-alt tr').each((i, element) => {
          const rank = i;

          const title = $(element).find('.resultsbright').text();

          const autor = $(element).find('.extras i').text();

          const link = $(element).find('.resultsbright a').attr('href');

          const detail = hostUrl + link;
          if (i > 0) {
            const metadata = {
              rank: rank,
              title: title,
              author: autor,
              detail: detail,
            };
            records.push(metadata);
          }
        });
        if (records.length != 0) {
          const jsonCatalogue = {
            url,
            totalRecords,
            nameU,
            records,
            universidad,
          };
          resolve(jsonCatalogue);
        } else {
          resolve('No hay datos para la búsqueda realizada');
        }
      } else {
        resolve('No hay datos para la búsqueda realizada');
      }
    });
  }

  async getCatalogueItm(finalKeyWord: string) {
    return new Promise(async (resolve, reject) => {
      if (!finalKeyWord) {
        return reject('Invalid data');
      }
      const hostUrl = await this.getHostUrl('6473f21a0bd4cdc48deb517d');

      const url =
        hostUrl +
        '/cgi-olib/?keyword=' +
        finalKeyWord +
        '&session=77447134&nh=20&infile=presearch.glue';

      const nameU = 'itm';
      const universidad = 'Instituto Tecnológico Metropolitano';

      const data = await this.http
        .get<any>(url)
        .catch((error) => resolve('No hay datos para la búsqueda realizada'));
      if (data) {
        const $ = cheerio.load(data);
        const records = [];
        const totalRecords = $('.number-of-hits font').text();

        $('.hitlist-alt tr').each((i, element) => {
          const rank = i;

          const title = $(element).find('.resultsbright').text();

          const autor = $(element).find('.extras i').text();

          const link = $(element).find('.resultsbright a').attr('href');

          const detail = hostUrl + link;
          if (i > 0) {
            const metadata = {
              rank: rank,
              title: title,
              author: autor,
              detail: detail,
            };
            records.push(metadata);
          }
        });
        if (records.length != 0) {
          const jsonCatalogue = {
            url,
            totalRecords,
            nameU,
            records,
            universidad,
          };
          resolve(jsonCatalogue);
        } else {
          resolve('No hay datos para la búsqueda realizada');
        }
      } else {
        resolve('No hay datos para la búsqueda realizada');
      }
    });
  }

  async getCatalogueSanbuena(finalKeyWord: string) {
    return new Promise(async (resolve, reject) => {
      if (!finalKeyWord) {
        return reject('Invalid data');
      }
      const hostUrl = await this.getHostUrl('649104635628af551b161c2c');

      const url =
        hostUrl +
        '/cgi-olibped?keyword=' +
        finalKeyWord +
        '&session=75925206&infile=presearch.glue';

      const nameU = 'sanbuenaventura';
      const universidad = 'Universidad de San Buenaventura';

      const data = await this.http
        .get<any>(url)
        .catch((error) => resolve('No hay datos para la búsqueda realizada'));
      if (data) {
        const $ = cheerio.load(data);
        const records = [];
        const totalRecords = $('.number-of-hits font').text();

        $('.hitlist-alt tr').each((i, element) => {
          const rank = i;

          const title = $(element).find('.resultsbright').text();

          const autor = $(element).find('.extras i').text();

          const link = $(element).find('.resultsbright a').attr('href');

          const detail = hostUrl + link;
          if (i > 0) {
            const metadata = {
              rank: rank,
              title: title,
              author: autor,
              detail: detail,
            };
            records.push(metadata);
          }
        });
        if (records.length != 0) {
          const jsonCatalogue = {
            url,
            totalRecords,
            nameU,
            records,
            universidad,
          };
          resolve(jsonCatalogue);
        } else {
          resolve('No hay datos para la búsqueda realizada');
        }
      } else {
        resolve('No hay datos para la búsqueda realizada');
      }
    });
  }

  async getCataloguePoligranc(finalKeyWord: string) {
    return new Promise(async (resolve, reject) => {
      if (!finalKeyWord) {
        return reject('Invalid data');
      }
      const hostUrl = await this.getHostUrl('6473f25c0bd4cdc48deb517f');

      const url =
        hostUrl + '/cgi-bin/koha/opac-search.pl?idx=&q=' + finalKeyWord;

      const nameU = 'poli-gran-colombiano';
      const universidad =
        'Institución Universitaria Politécnico Grancolombiano';

      const data = await this.http
        .get<any>(url)
        .catch((error) => resolve('No hay datos para la búsqueda realizada'));
      if (data) {
        const $ = cheerio.load(data);
        const records = [];
        const totalR = $('#numresults strong').text();

        let totalRecords;
        if (totalR) {
          totalRecords = totalR.match(/\d+/g).join(' ');
        } else {
          totalRecords = '';
        }

        $('.bibliocol').each((i, element) => {
          const rank = $(element).prev().text();

          const title = $(element).find('.title').text();

          const autor = $(element).find('.author').text();

          const link = $(element).find('a').attr('href');

          const detail =
            hostUrl + link + '&query_desc=kw%2Cwrdl%3A%20' + finalKeyWord + ' ';

          const metadata = {
            rank: rank,
            title: title,
            author: autor,
            detail: detail,
          };

          records.push(metadata);
        });
        if (records.length != 0) {
          const jsonCatalogue = {
            url,
            totalRecords,
            nameU,
            records,
            universidad,
          };
          resolve(jsonCatalogue);
        } else {
          resolve('No hay datos para la búsqueda realizada');
        }
      } else {
        resolve('No hay datos para la búsqueda realizada');
      }
    });
  }

  async getCatalogueCeipa(finalKeyWord: string) {
    return new Promise(async (resolve, reject) => {
      if (!finalKeyWord) {
        return reject('Invalid data');
      }
      const hostUrl = await this.getHostUrl('6473f27e0bd4cdc48deb5181');

      const url =
        hostUrl +
        '/informe.jsp?cr1=T&cr2=A&cr3=M&con1=0&con2=0&con3=' +
        finalKeyWord +
        '&cole=Todos&ano=&ubi=Todos&idi=Todos';

      const nameU = 'ceipa';
      const universidad = 'Ceipa';

      const data = await this.http
        .get<any>(url)
        .catch((error) => resolve('No hay datos para la búsqueda realizada'));
      if (data) {
        const $ = cheerio.load(data);
        const records = [];

        $("form center table[border='0']").each((i, element) => {
          const rank = i + 1;

          const title = $(element)
            .find('td[width="660"] .Estilo17')
            .text()
            .trim();

          const autor = $(element)
            .find('td[width="660"]')
            .parent()
            .next()
            .children('.Estilo30')
            .text()
            .trim();

          const link = $(element)
            .find('a[target="_blank"]:nth-child(3)')
            .attr('href')
            .trim();

          const detail = hostUrl + link + ' ';

          const metadata = {
            rank: rank,
            title: title,
            author: autor,
            detail: detail,
          };

          records.push(metadata);
        });
        const totalRecords = records.length;
        if (records.length != 0) {
          const jsonCatalogue = {
            url,
            totalRecords,
            nameU,
            records,
            universidad,
          };
          resolve(jsonCatalogue);
        } else {
          resolve('No hay datos para la búsqueda realizada');
        }
      } else {
        resolve('No hay datos para la búsqueda realizada');
      }
    });
  }

  async getCatalogueColegiatura(finalKeyWord: string) {
    return new Promise(async (resolve, reject) => {
      if (!finalKeyWord) {
        return reject('Invalid data');
      }
      const hostUrl = await this.getHostUrl('6473f2d20bd4cdc48deb5183');

      const url = hostUrl + '/cgi-bin/koha/opac-search.pl?q=' + finalKeyWord;

      const nameU = 'colegiatura';
      const universidad = 'COLEGIATURA';
      const data = await this.http
        .get<any>(url)
        .catch((error) => resolve('No hay datos para la búsqueda realizada'));
      if (data) {
        const $ = cheerio.load(data);
        const records = [];
        const totalR = $('#numresults strong').text();

        let totalRecords;
        if (totalR) {
          totalRecords = totalR.match(/\d+/g).join(' ');
        } else {
          totalRecords = '';
        }

        $('.bibliocol').each((i, element) => {
          const rank = $(element).prev().text();

          const title = $(element).find('.title').text();

          const autor = $(element).find('.author').text();

          const link = $(element).find('a').attr('href');

          const detail =
            hostUrl + link + '&query_desc=kw%2Cwrdl%3A%20' + finalKeyWord + ' ';

          const metadata = {
            rank: rank,
            title: title,
            author: autor,
            detail: detail,
          };

          records.push(metadata);
        });
        if (records.length != 0) {
          const jsonCatalogue = {
            url,
            totalRecords,
            nameU,
            records,
            universidad,
          };
          resolve(jsonCatalogue);
        } else {
          resolve('No hay datos para la búsqueda realizada');
        }
      } else {
        resolve('No hay datos para la búsqueda realizada');
      }
    });
  }

  async getCatalogueUnal(finalKeyWord: string) {
    return new Promise(async (resolve, reject) => {
      if (!finalKeyWord) {
        return reject('Invalid data');
      }
      const hostUrl = await this.getHostUrl('6473f30d0bd4cdc48deb5185');

      const url =
        hostUrl +
        '/F/?func=find-b&request=' +
        finalKeyWord +
        '&find_code=WRD&adjacent=N&x=44&y=6';

      const nameU = 'unal';
      const universidad = 'Universidad Nacional de Colombia';
      const data = await this.http
        .get<any>(url)
        .catch((error) => resolve('No hay datos para la búsqueda realizada'));
      if (data) {
        const $ = cheerio.load(data);
        const records = [];
        const totalRecords = $('.text3[width="20%"]')
          .text()
          .trim()
          .substring(38, 44)
          .trim();

        $("table[cellspacing='2'] tr[valign='baseline']").each((i, element) => {
          const rank = i + 1;

          const titleStartingPosition = $(element)
            .find('td.td1:nth-child(5)')
            .html()
            .trim()
            .indexOf('=');

          const titleFinalPosition = $(element)
            .find('td.td1:nth-child(5)')
            .html()
            .trim()
            .indexOf('recordLink');

          const titlePre = $(element)
            .find('td.td1:nth-child(5)')
            .html()
            .trim()
            .substring(titleStartingPosition + 3, titleFinalPosition - 3);

          const title = titlePre.replace(/&nbsp;/g, ' ');

          const autor = $(element).find('td.td1:nth-child(3)').text().trim();

          const link = $(element).find('td.td1:nth-child(1) a').attr('href');

          const metadata = {
            rank: rank,
            title: title,
            author: autor,
            detail: link,
          };

          records.push(metadata);
        });
        if (records.length != 0) {
          const jsonCatalogue = {
            url,
            totalRecords,
            nameU,
            records,
            universidad,
          };
          resolve(jsonCatalogue);
        } else {
          resolve('No hay datos para la búsqueda realizada');
        }
      } else {
        resolve('No hay datos para la búsqueda realizada');
      }
    });
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Library exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create Library - Check server logs`,
    );
  }
}
