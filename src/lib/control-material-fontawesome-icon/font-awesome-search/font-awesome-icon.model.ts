export interface Icon {
  id : string
  unicode : string
  label : string
  familyStylesByLicense: FamilyStylesByLicense
}

export interface FamilyStylesByLicense {
  free: FamilyStyles[]
  pro: FamilyStyles[]
}

export interface FamilyStyles {
  family: string
  style: string
}
