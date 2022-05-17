import { Sex } from '../enums/sex.enum';

export class User {

	@IsString()
  name;

  @IsString()
  surname;
 
  @IsNumber()
  age = 0;
  
  @IsNumber()
  weight = 0;
  
  @IsNumber()
  height = 0;
  
	@IsEnum(Sex)
  sex: Sex = Sex.MALE;
  

  constructor(
    name: string,
    surname: string,
    age: number,
    weight: number,
    height: number,
    sex: Sex
  ) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.sex = sex;
  }
}
