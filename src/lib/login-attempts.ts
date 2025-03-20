export interface LoginAttempt {
    id: string;
    userId: string | null;
    wrongId: string | null;
    timestamp: Date;
    success: boolean;
  }
  
  // In-memory storage for login attempts
  let loginAttempts: LoginAttempt[] = [
    {
      id: "1",
      userId: "CUS001",
      wrongId: null,
      timestamp: new Date(2025, 2, 15, 9, 30, 0),
      success: true
    },
    {
      id: "2",
      userId: null,
      wrongId: "CUS123",
      timestamp: new Date(2025, 2, 15, 10, 15, 0),
      success: false
    },
    {
      id: "3",
      userId: null,
      wrongId: "CUST456",
      timestamp: new Date(2025, 2, 15, 11, 45, 0),
      success: false
    },
    {
      id: "4",
      userId: "CUS002",
      wrongId: null,
      timestamp: new Date(2025, 2, 16, 8, 20, 0),
      success: true
    },
    {
      id: "5",
      userId: null,
      wrongId: "USER789",
      timestamp: new Date(2025, 2, 16, 9, 10, 0),
      success: false
    },
    {
      id: "6",
      userId: "CUS003",
      wrongId: null,
      timestamp: new Date(2025, 2, 16, 14, 5, 0),
      success: true
    },
    {
      id: "7",
      userId: null,
      wrongId: "ADMIN",
      timestamp: new Date(2025, 2, 17, 7, 30, 0),
      success: false
    },
    {
      id: "8",
      userId: "CUS004",
      wrongId: null,
      timestamp: new Date(2025, 2, 17, 11, 0, 0),
      success: true
    },
    {
      id: "9",
      userId: null,
      wrongId: "CUSTOMER",
      timestamp: new Date(2025, 2, 17, 16, 45, 0),
      success: false
    },
    {
      id: "10",
      userId: "CUS005",
      wrongId: null,
      timestamp: new Date(2025, 2, 18, 10, 30, 0),
      success: true
    },
    {
      id: "11",
      userId: null,
      wrongId: "BANK123",
      timestamp: new Date(2025, 2, 18, 13, 15, 0),
      success: false
    },
    {
      id: "12",
      userId: null,
      wrongId: "ACCOUNT",
      timestamp: new Date(2025, 2, 18, 15, 20, 0),
      success: false
    }
  ];
  
  // Add a new login attempt
  export function addLoginAttempt(attempt: Omit<LoginAttempt, "id">): LoginAttempt {
    const newAttempt = {
      ...attempt,
      id: (loginAttempts.length + 1).toString()
    };
    
    loginAttempts = [...loginAttempts, newAttempt];
    return newAttempt;
  }
  
  // Get all login attempts with pagination
  export function getLoginAttempts(page: number = 1, pageSize: number = 5): {
    data: LoginAttempt[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  } {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = loginAttempts.slice(start, end);
    
    return {
      data: paginatedData,
      total: loginAttempts.length,
      page,
      pageSize,
      totalPages: Math.ceil(loginAttempts.length / pageSize)
    };
  }
  
  // Get login attempts by success status
  export function getLoginAttemptsByStatus(success: boolean, page: number = 1, pageSize: number = 5): {
    data: LoginAttempt[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  } {
    const filteredAttempts = loginAttempts.filter(attempt => attempt.success === success);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = filteredAttempts.slice(start, end);
    
    return {
      data: paginatedData,
      total: filteredAttempts.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredAttempts.length / pageSize)
    };
  }
  