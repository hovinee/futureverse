import { NextResponse } from 'next/server'

class ResponseHelper {
  static success(data: any = '', status: number = 200, result: number = 1000) {
    return NextResponse.json(
      { result: result, resultMsg: 'success', ...data },
      { status },
    )
  }

  static error(errorMsg: string, status: number = 400, result: number = 1001) {
    return NextResponse.json(
      { result: result, resultMsg: errorMsg, data: null },
      { status },
    )
  }

  static internalError(msg: any) {
    return NextResponse.json(
      { result: -1, resultMsg: 'Internal Server Error\n' + msg, data: null },
      { status: 500 },
    )
  }
}

export default ResponseHelper
