import { IsString, Length, Matches } from 'class-validator';

export class SlugParams {
  @IsString()
  @Length(1, 96)
  @Matches(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i, {
    message: 'slug must be alphanumeric with hyphens',
  })
  slug!: string;
}
