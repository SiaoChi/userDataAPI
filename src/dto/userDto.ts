import { IsOptional, IsString } from 'class-validator';

/* userInfo = [ { id:1, name:kelly, jobType: agent } ]
    
    userDetail = [ { 
    id:1 ,  
    createdAt: '2022-12-26T06:21:15.257Z',
    city: 'Oakland',
    zipCode: '70097',
    address: '07744 Loren Forge',
    gender: 'F2M',
    id: '50'} ]*/

export class UsersInfoDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly jobType: string;
}

export class UsersDetailsDto {
  @IsString()
  readonly id: string;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly jobType?: string;

  @IsString()
  readonly createdAt: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly zipCode: string;

  @IsString()
  readonly address: string;

  @IsString()
  readonly gender: string;
}
