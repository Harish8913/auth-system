enum Status {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
}

interface adminDetails {
  email: string;
  status: Status;
}

export interface RegisterOrgBody {
  name: string;
  description: string;

  adminDetails: adminDetails;
}
