import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '@dream-more/shared';

/**
 * RegisterDto - የተጠቃሚዎች መመዝገቢያ መረጃ ማረጋገጫ (Validation DTO)
 */
export class RegisterDto {
  @IsString({ message: 'ሙሉ ስም የፊደል መረጃ መሆን አለበት' })
  @IsNotEmpty({ message: 'እባክዎ ሙሉ ስምዎን ያስገቡ' })
  name: string;

  @IsEmail({}, { message: 'እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ' })
  @IsNotEmpty({ message: 'ኢሜይል አስፈላጊ ነው' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'የይለፍ ቃል ቢያንስ 6 ፊደላት ወይም ቁጥሮች መሆን አለበት' })
  password: string;

  @IsEnum(UserRole, { message: 'የተመረጠው ሚና ትክክል አይደለም' })
  @IsOptional()
  role?: UserRole = UserRole.STUDENT;
}

/**
 * LoginDto - የተጠቃሚዎች መግቢያ መረጃ ማረጋገጫ (Login Validation DTO)
 */
export class LoginDto {
  @IsEmail({}, { message: 'እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ' })
  @IsNotEmpty({ message: 'ኢሜይል አስፈላጊ ነው' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'የይለፍ ቃል ማስገባት አስፈላጊ ነው' })
  password: string;
}
