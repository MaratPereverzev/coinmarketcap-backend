import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/utils";
import type { IAsset } from "@/utils/types";
import Assets from "@/models/assets";
