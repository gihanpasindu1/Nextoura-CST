import { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tourist } from "@/lib/tourism-data";
import { Loader2, Plus, UploadCloud, FileText, Settings2, Trash2, X, Users, AlertCircle, Send, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

const COUNTRIES = [
  { name: "Afghanistan", code: "AF", flag: "\ud83c\udde6\ud83c\uddeb", dialCode: "+93", pattern: /^[0-9]{9}$/, placeholder: "70 123 4567" },
  { name: "Albania", code: "AL", flag: "\ud83c\udde6\ud83c\uddf1", dialCode: "+355", pattern: /^[0-9]{8,9}$/, placeholder: "66 234 5678" },
  { name: "Algeria", code: "DZ", flag: "\ud83c\udde9\ud83c\uddff", dialCode: "+213", pattern: /^[0-9]{8,9}$/, placeholder: "55 123 4567" },
  { name: "Andorra", code: "AD", flag: "\ud83c\udde6\ud83c\udde9", dialCode: "+376", pattern: /^[0-9]{6,9}$/, placeholder: "312 345" },
  { name: "Angola", code: "AO", flag: "\ud83c\udde6\ud83c\uddf4", dialCode: "+244", pattern: /^[0-9]{9}$/, placeholder: "923 123 456" },
  { name: "Antigua and Barbuda", code: "AG", flag: "\ud83c\udde6\ud83c\uddec", dialCode: "+1268", pattern: /^[0-9]{7}$/, placeholder: "464 1234" },
  { name: "Argentina", code: "AR", flag: "\ud83c\udde6\ud83c\uddf7", dialCode: "+54", pattern: /^[0-9]{10,11}$/, placeholder: "11 2345 6789" },
  { name: "Armenia", code: "AM", flag: "\ud83c\udde6\ud83c\uddf2", dialCode: "+374", pattern: /^[0-9]{8}$/, placeholder: "77 123 456" },
  { name: "Australia", code: "AU", flag: "\ud83c\udde6\ud83c\uddfa", dialCode: "+61", pattern: /^[0-9]{9}$/, placeholder: "412 998 221" },
  { name: "Austria", code: "AT", flag: "\ud83c\udde6\ud83c\uddf9", dialCode: "+43", pattern: /^[0-9]{10,11}$/, placeholder: "664 123 4567" },
  { name: "Azerbaijan", code: "AZ", flag: "\ud83c\udde6\ud83c\uddff", dialCode: "+994", pattern: /^[0-9]{9}$/, placeholder: "50 123 4567" },
  { name: "Bahamas", code: "BS", flag: "\ud83c\udde7\ud83c\uddf8", dialCode: "+1242", pattern: /^[0-9]{7}$/, placeholder: "359 1234" },
  { name: "Bahrain", code: "BH", flag: "\ud83c\udde7\ud83c\udded", dialCode: "+973", pattern: /^[0-9]{8}$/, placeholder: "3600 1234" },
  { name: "Bangladesh", code: "BD", flag: "\ud83c\udde7\ud83c\udde9", dialCode: "+880", pattern: /^[0-9]{10}$/, placeholder: "1812 345678" },
  { name: "Barbados", code: "BB", flag: "\ud83c\udde7\ud83c\udde7", dialCode: "+1246", pattern: /^[0-9]{7}$/, placeholder: "250 1234" },
  { name: "Belarus", code: "BY", flag: "\ud83c\udde7\ud83c\uddfe", dialCode: "+375", pattern: /^[0-9]{9,10}$/, placeholder: "29 491 1911" },
  { name: "Belgium", code: "BE", flag: "\ud83c\udde7\ud83c\uddea", dialCode: "+32", pattern: /^[0-9]{8,9}$/, placeholder: "470 12 3456" },
  { name: "Belize", code: "BZ", flag: "\ud83c\udde7\ud83c\uddff", dialCode: "+501", pattern: /^[0-9]{7}$/, placeholder: "622 1234" },
  { name: "Benin", code: "BJ", flag: "\ud83c\udde7\ud83c\uddef", dialCode: "+229", pattern: /^[0-9]{8}$/, placeholder: "90 01 1234" },
  { name: "Bhutan", code: "BT", flag: "\ud83c\udde7\ud83c\uddf9", dialCode: "+975", pattern: /^[0-9]{7,8}$/, placeholder: "17 12 3456" },
  { name: "Bolivia", code: "BO", flag: "\ud83c\udde7\ud83c\uddf4", dialCode: "+591", pattern: /^[0-9]{8}$/, placeholder: "7123 4567" },
  { name: "Bosnia and Herzegovina", code: "BA", flag: "\ud83c\udde7\ud83c\udde6", dialCode: "+387", pattern: /^[0-9]{8}$/, placeholder: "61 123 456" },
  { name: "Botswana", code: "BW", flag: "\ud83c\udde7\ud83c\uddfc", dialCode: "+267", pattern: /^[0-9]{7,8}$/, placeholder: "71 123 456" },
  { name: "Brazil", code: "BR", flag: "\ud83c\udde7\ud83c\uddf7", dialCode: "+55", pattern: /^[0-9]{10,11}$/, placeholder: "11 96123 4567" },
  { name: "Brunei", code: "BN", flag: "\ud83c\udde7\ud83c\uddf3", dialCode: "+673", pattern: /^[0-9]{7}$/, placeholder: "712 3456" },
  { name: "Bulgaria", code: "BG", flag: "\ud83c\udde7\ud83c\uddec", dialCode: "+359", pattern: /^[0-9]{8,9}$/, placeholder: "48 123 456" },
  { name: "Burkina Faso", code: "BF", flag: "\ud83c\udde7\ud83c\uddeb", dialCode: "+226", pattern: /^[0-9]{8}$/, placeholder: "70 12 3456" },
  { name: "Burundi", code: "BI", flag: "\ud83c\udde7\ud83c\uddee", dialCode: "+257", pattern: /^[0-9]{8}$/, placeholder: "79 56 1234" },
  { name: "Cambodia", code: "KH", flag: "\ud83c\uddf0\ud83c\udded", dialCode: "+855", pattern: /^[0-9]{8,9}$/, placeholder: "91 234 567" },
  { name: "Cameroon", code: "CM", flag: "\ud83c\udde8\ud83c\uddf2", dialCode: "+237", pattern: /^[0-9]{8,9}$/, placeholder: "6 71 23 4567" },
  { name: "Canada", code: "CA", flag: "\ud83c\udde8\ud83c\udde6", dialCode: "+1", pattern: /^[0-9]{10}$/, placeholder: "204 234 5678" },
  { name: "Cape Verde", code: "CV", flag: "\ud83c\udde8\ud83c\uddfb", dialCode: "+238", pattern: /^[0-9]{7}$/, placeholder: "991 1234" },
  { name: "Central African Republic", code: "CF", flag: "\ud83c\udde8\ud83c\uddeb", dialCode: "+236", pattern: /^[0-9]{8}$/, placeholder: "70 01 2345" },
  { name: "Chad", code: "TD", flag: "\ud83c\uddf9\ud83c\udde9", dialCode: "+235", pattern: /^[0-9]{8}$/, placeholder: "63 01 2345" },
  { name: "Chile", code: "CL", flag: "\ud83c\udde8\ud83c\uddf1", dialCode: "+56", pattern: /^[0-9]{9}$/, placeholder: "9 6123 4567" },
  { name: "China", code: "CN", flag: "\ud83c\udde8\ud83c\uddf3", dialCode: "+86", pattern: /^[0-9]{11}$/, placeholder: "138 0013 8000" },
  { name: "Colombia", code: "CO", flag: "\ud83c\udde8\ud83c\uddf4", dialCode: "+57", pattern: /^[0-9]{10}$/, placeholder: "321 123 4567" },
  { name: "Comoros", code: "KM", flag: "\ud83c\uddf0\ud83c\uddf2", dialCode: "+269", pattern: /^[0-9]{7}$/, placeholder: "321 2345" },
  { name: "Congo (DRC)", code: "CD", flag: "\ud83c\udde8\ud83c\udde9", dialCode: "+243", pattern: /^[0-9]{9}$/, placeholder: "99 123 4567" },
  { name: "Congo (Republic)", code: "CG", flag: "\ud83c\udde8\ud83c\uddec", dialCode: "+242", pattern: /^[0-9]{9}$/, placeholder: "06 123 4567" },
  { name: "Costa Rica", code: "CR", flag: "\ud83c\udde8\ud83c\uddf7", dialCode: "+506", pattern: /^[0-9]{8}$/, placeholder: "8312 3456" },
  { name: "Croatia", code: "HR", flag: "\ud83c\udded\ud83c\uddf7", dialCode: "+385", pattern: /^[0-9]{8,9}$/, placeholder: "91 234 5678" },
  { name: "Cuba", code: "CU", flag: "\ud83c\udde8\ud83c\uddfa", dialCode: "+53", pattern: /^[0-9]{8}$/, placeholder: "5 1234567" },
  { name: "Cyprus", code: "CY", flag: "\ud83c\udde8\ud83c\uddfe", dialCode: "+357", pattern: /^[0-9]{8}$/, placeholder: "96 123456" },
  { name: "Czech Republic", code: "CZ", flag: "\ud83c\udde8\ud83c\uddff", dialCode: "+420", pattern: /^[0-9]{9}$/, placeholder: "601 123 456" },
  { name: "Denmark", code: "DK", flag: "\ud83c\udde9\ud83c\uddf0", dialCode: "+45", pattern: /^[0-9]{8}$/, placeholder: "32 12 3456" },
  { name: "Djibouti", code: "DJ", flag: "\ud83c\udde9\ud83c\uddef", dialCode: "+253", pattern: /^[0-9]{8}$/, placeholder: "77 83 1234" },
  { name: "Dominica", code: "DM", flag: "\ud83c\udde9\ud83c\uddf2", dialCode: "+1767", pattern: /^[0-9]{7}$/, placeholder: "225 1234" },
  { name: "Dominican Republic", code: "DO", flag: "\ud83c\udde9\ud83c\uddf4", dialCode: "+1809", pattern: /^[0-9]{7}$/, placeholder: "234 5678" },
  { name: "Ecuador", code: "EC", flag: "\ud83c\uddea\ud83c\udde8", dialCode: "+593", pattern: /^[0-9]{9}$/, placeholder: "99 123 4567" },
  { name: "Egypt", code: "EG", flag: "\ud83c\uddea\ud83c\uddec", dialCode: "+20", pattern: /^[0-9]{10}$/, placeholder: "100 123 4567" },
  { name: "El Salvador", code: "SV", flag: "\ud83c\uddf8\ud83c\uddfb", dialCode: "+503", pattern: /^[0-9]{8}$/, placeholder: "7012 3456" },
  { name: "Equatorial Guinea", code: "GQ", flag: "\ud83c\uddec\ud83c\uddf6", dialCode: "+240", pattern: /^[0-9]{9}$/, placeholder: "222 123 456" },
  { name: "Eritrea", code: "ER", flag: "\ud83c\uddea\ud83c\uddf7", dialCode: "+291", pattern: /^[0-9]{7}$/, placeholder: "7 123 456" },
  { name: "Estonia", code: "EE", flag: "\ud83c\uddea\ud83c\uddea", dialCode: "+372", pattern: /^[0-9]{7,8}$/, placeholder: "5123 4567" },
  { name: "Eswatini", code: "SZ", flag: "\ud83c\uddf8\ud83c\uddff", dialCode: "+268", pattern: /^[0-9]{7,8}$/, placeholder: "7612 3456" },
  { name: "Ethiopia", code: "ET", flag: "\ud83c\uddea\ud83c\uddf9", dialCode: "+251", pattern: /^[0-9]{9}$/, placeholder: "91 123 4567" },
  { name: "Fiji", code: "FJ", flag: "\ud83c\uddeb\ud83c\uddef", dialCode: "+679", pattern: /^[0-9]{7}$/, placeholder: "701 2345" },
  { name: "Finland", code: "FI", flag: "\ud83c\uddeb\ud83c\uddee", dialCode: "+358", pattern: /^[0-9]{9,10}$/, placeholder: "41 234 5678" },
  { name: "France", code: "FR", flag: "\ud83c\uddeb\ud83c\uddf7", dialCode: "+33", pattern: /^[0-9]{9}$/, placeholder: "6 12 34 56 78" },
  { name: "Gabon", code: "GA", flag: "\ud83c\uddec\ud83c\udde6", dialCode: "+241", pattern: /^[0-9]{7,8}$/, placeholder: "06 03 1234" },
  { name: "Gambia", code: "GM", flag: "\ud83c\uddec\ud83c\uddf2", dialCode: "+220", pattern: /^[0-9]{7}$/, placeholder: "301 2345" },
  { name: "Georgia", code: "GE", flag: "\ud83c\uddec\ud83c\uddea", dialCode: "+995", pattern: /^[0-9]{9}$/, placeholder: "555 12 3456" },
  { name: "Germany", code: "DE", flag: "\ud83c\udde9\ud83c\uddea", dialCode: "+49", pattern: /^[0-9]{10,11}$/, placeholder: "171 2345678" },
  { name: "Ghana", code: "GH", flag: "\ud83c\uddec\ud83c\udded", dialCode: "+233", pattern: /^[0-9]{9}$/, placeholder: "23 123 4567" },
  { name: "Greece", code: "GR", flag: "\ud83c\uddec\ud83c\uddf7", dialCode: "+30", pattern: /^[0-9]{10}$/, placeholder: "691 234 5678" },
  { name: "Grenada", code: "GD", flag: "\ud83c\uddec\ud83c\udde9", dialCode: "+1473", pattern: /^[0-9]{7}$/, placeholder: "403 1234" },
  { name: "Guatemala", code: "GT", flag: "\ud83c\uddec\ud83c\uddf9", dialCode: "+502", pattern: /^[0-9]{8}$/, placeholder: "5123 4567" },
  { name: "Guinea", code: "GN", flag: "\ud83c\uddec\ud83c\uddf3", dialCode: "+224", pattern: /^[0-9]{8,9}$/, placeholder: "601 12 3456" },
  { name: "Guinea-Bissau", code: "GW", flag: "\ud83c\uddec\ud83c\uddfc", dialCode: "+245", pattern: /^[0-9]{7}$/, placeholder: "955 1234" },
  { name: "Guyana", code: "GY", flag: "\ud83c\uddec\ud83c\uddfe", dialCode: "+592", pattern: /^[0-9]{7}$/, placeholder: "609 1234" },
  { name: "Haiti", code: "HT", flag: "\ud83c\udded\ud83c\uddf9", dialCode: "+509", pattern: /^[0-9]{8}$/, placeholder: "3412 3456" },
  { name: "Honduras", code: "HN", flag: "\ud83c\udded\ud83c\uddf3", dialCode: "+504", pattern: /^[0-9]{8}$/, placeholder: "9123 4567" },
  { name: "Hong Kong", code: "HK", flag: "\ud83c\udded\ud83c\uddf0", dialCode: "+852", pattern: /^[0-9]{8}$/, placeholder: "5123 4567" },
  { name: "Hungary", code: "HU", flag: "\ud83c\udded\ud83c\uddfa", dialCode: "+36", pattern: /^[0-9]{9}$/, placeholder: "20 123 4567" },
  { name: "Iceland", code: "IS", flag: "\ud83c\uddee\ud83c\uddf8", dialCode: "+354", pattern: /^[0-9]{7}$/, placeholder: "611 1234" },
  { name: "India", code: "IN", flag: "\ud83c\uddee\ud83c\uddf3", dialCode: "+91", pattern: /^[0-9]{10}$/, placeholder: "98212 44109" },
  { name: "Indonesia", code: "ID", flag: "\ud83c\uddee\ud83c\udde9", dialCode: "+62", pattern: /^[0-9]{9,12}$/, placeholder: "812 345 678" },
  { name: "Iran", code: "IR", flag: "\ud83c\uddee\ud83c\uddf7", dialCode: "+98", pattern: /^[0-9]{10}$/, placeholder: "912 345 6789" },
  { name: "Iraq", code: "IQ", flag: "\ud83c\uddee\ud83c\uddf6", dialCode: "+964", pattern: /^[0-9]{10}$/, placeholder: "790 123 4567" },
  { name: "Ireland", code: "IE", flag: "\ud83c\uddee\ud83c\uddea", dialCode: "+353", pattern: /^[0-9]{9}$/, placeholder: "87 661 2003" },
  { name: "Israel", code: "IL", flag: "\ud83c\uddee\ud83c\uddf1", dialCode: "+972", pattern: /^[0-9]{9}$/, placeholder: "50 234 5678" },
  { name: "Italy", code: "IT", flag: "\ud83c\uddee\ud83c\uddf9", dialCode: "+39", pattern: /^[0-9]{9,10}$/, placeholder: "333 421 8870" },
  { name: "Ivory Coast", code: "CI", flag: "\ud83c\udde8\ud83c\uddee", dialCode: "+225", pattern: /^[0-9]{10}$/, placeholder: "01 23 45 6789" },
  { name: "Jamaica", code: "JM", flag: "\ud83c\uddef\ud83c\uddf2", dialCode: "+1876", pattern: /^[0-9]{7}$/, placeholder: "210 1234" },
  { name: "Japan", code: "JP", flag: "\ud83c\uddef\ud83c\uddf5", dialCode: "+81", pattern: /^[0-9]{9,10}$/, placeholder: "90 1234 5678" },
  { name: "Jordan", code: "JO", flag: "\ud83c\uddef\ud83c\uddf4", dialCode: "+962", pattern: /^[0-9]{8,9}$/, placeholder: "7 9012 3456" },
  { name: "Kazakhstan", code: "KZ", flag: "\ud83c\uddf0\ud83c\uddff", dialCode: "+7", pattern: /^[0-9]{10}$/, placeholder: "771 000 9998" },
  { name: "Kenya", code: "KE", flag: "\ud83c\uddf0\ud83c\uddea", dialCode: "+254", pattern: /^[0-9]{9}$/, placeholder: "712 123 456" },
  { name: "Kiribati", code: "KI", flag: "\ud83c\uddf0\ud83c\uddee", dialCode: "+686", pattern: /^[0-9]{5,8}$/, placeholder: "72001234" },
  { name: "Kuwait", code: "KW", flag: "\ud83c\uddf0\ud83c\uddfc", dialCode: "+965", pattern: /^[0-9]{8}$/, placeholder: "500 12345" },
  { name: "Kyrgyzstan", code: "KG", flag: "\ud83c\uddf0\ud83c\uddec", dialCode: "+996", pattern: /^[0-9]{9}$/, placeholder: "700 123 456" },
  { name: "Laos", code: "LA", flag: "\ud83c\uddf1\ud83c\udde6", dialCode: "+856", pattern: /^[0-9]{8,10}$/, placeholder: "20 23 123 456" },
  { name: "Latvia", code: "LV", flag: "\ud83c\uddf1\ud83c\uddfb", dialCode: "+371", pattern: /^[0-9]{8}$/, placeholder: "2123 4567" },
  { name: "Lebanon", code: "LB", flag: "\ud83c\uddf1\ud83c\udde7", dialCode: "+961", pattern: /^[0-9]{7,8}$/, placeholder: "71 123 456" },
  { name: "Lesotho", code: "LS", flag: "\ud83c\uddf1\ud83c\uddf8", dialCode: "+266", pattern: /^[0-9]{8}$/, placeholder: "5012 3456" },
  { name: "Liberia", code: "LR", flag: "\ud83c\uddf1\ud83c\uddf7", dialCode: "+231", pattern: /^[0-9]{7,9}$/, placeholder: "77 012 3456" },
  { name: "Libya", code: "LY", flag: "\ud83c\uddf1\ud83c\uddfe", dialCode: "+218", pattern: /^[0-9]{9}$/, placeholder: "91 234 5678" },
  { name: "Liechtenstein", code: "LI", flag: "\ud83c\uddf1\ud83c\uddee", dialCode: "+423", pattern: /^[0-9]{7}$/, placeholder: "660 1234" },
  { name: "Lithuania", code: "LT", flag: "\ud83c\uddf1\ud83c\uddf9", dialCode: "+370", pattern: /^[0-9]{8}$/, placeholder: "612 34567" },
  { name: "Luxembourg", code: "LU", flag: "\ud83c\uddf1\ud83c\uddfa", dialCode: "+352", pattern: /^[0-9]{8,9}$/, placeholder: "628 123 456" },
  { name: "Macau", code: "MO", flag: "\ud83c\uddf2\ud83c\uddf4", dialCode: "+853", pattern: /^[0-9]{8}$/, placeholder: "6612 3456" },
  { name: "Madagascar", code: "MG", flag: "\ud83c\uddf2\ud83c\uddec", dialCode: "+261", pattern: /^[0-9]{9}$/, placeholder: "32 12 345 67" },
  { name: "Malawi", code: "MW", flag: "\ud83c\uddf2\ud83c\uddfc", dialCode: "+265", pattern: /^[0-9]{7,9}$/, placeholder: "991 23 4567" },
  { name: "Malaysia", code: "MY", flag: "\ud83c\uddf2\ud83c\uddfe", dialCode: "+60", pattern: /^[0-9]{9,10}$/, placeholder: "12 345 6789" },
  { name: "Maldives", code: "MV", flag: "\ud83c\uddf2\ud83c\uddfb", dialCode: "+960", pattern: /^[0-9]{7}$/, placeholder: "771 2345" },
  { name: "Mali", code: "ML", flag: "\ud83c\uddf2\ud83c\uddf1", dialCode: "+223", pattern: /^[0-9]{8}$/, placeholder: "65 01 2345" },
  { name: "Malta", code: "MT", flag: "\ud83c\uddf2\ud83c\uddf9", dialCode: "+356", pattern: /^[0-9]{8}$/, placeholder: "9696 1234" },
  { name: "Marshall Islands", code: "MH", flag: "\ud83c\uddf2\ud83c\udded", dialCode: "+692", pattern: /^[0-9]{7}$/, placeholder: "235 1234" },
  { name: "Mauritania", code: "MR", flag: "\ud83c\uddf2\ud83c\uddf7", dialCode: "+222", pattern: /^[0-9]{8}$/, placeholder: "22 12 3456" },
  { name: "Mauritius", code: "MU", flag: "\ud83c\uddf2\ud83c\uddfa", dialCode: "+230", pattern: /^[0-9]{8}$/, placeholder: "5251 2345" },
  { name: "Mexico", code: "MX", flag: "\ud83c\uddf2\ud83c\uddfd", dialCode: "+52", pattern: /^[0-9]{10}$/, placeholder: "222 123 4567" },
  { name: "Micronesia", code: "FM", flag: "\ud83c\uddeb\ud83c\uddf2", dialCode: "+691", pattern: /^[0-9]{7}$/, placeholder: "350 1234" },
  { name: "Moldova", code: "MD", flag: "\ud83c\uddf2\ud83c\udde9", dialCode: "+373", pattern: /^[0-9]{8}$/, placeholder: "621 12345" },
  { name: "Monaco", code: "MC", flag: "\ud83c\uddf2\ud83c\udde8", dialCode: "+377", pattern: /^[0-9]{8,9}$/, placeholder: "6 12 34 56 78" },
  { name: "Mongolia", code: "MN", flag: "\ud83c\uddf2\ud83c\uddf3", dialCode: "+976", pattern: /^[0-9]{8}$/, placeholder: "8812 3456" },
  { name: "Montenegro", code: "ME", flag: "\ud83c\uddf2\ud83c\uddea", dialCode: "+382", pattern: /^[0-9]{8}$/, placeholder: "67 622 901" },
  { name: "Morocco", code: "MA", flag: "\ud83c\uddf2\ud83c\udde6", dialCode: "+212", pattern: /^[0-9]{9}$/, placeholder: "650 123456" },
  { name: "Mozambique", code: "MZ", flag: "\ud83c\uddf2\ud83c\uddff", dialCode: "+258", pattern: /^[0-9]{9}$/, placeholder: "82 123 4567" },
  { name: "Myanmar", code: "MM", flag: "\ud83c\uddf2\ud83c\uddf2", dialCode: "+95", pattern: /^[0-9]{7,10}$/, placeholder: "9 212 3456" },
  { name: "Namibia", code: "NA", flag: "\ud83c\uddf3\ud83c\udde6", dialCode: "+264", pattern: /^[0-9]{7,10}$/, placeholder: "81 123 4567" },
  { name: "Nauru", code: "NR", flag: "\ud83c\uddf3\ud83c\uddf7", dialCode: "+674", pattern: /^[0-9]{7}$/, placeholder: "555 1234" },
  { name: "Nepal", code: "NP", flag: "\ud83c\uddf3\ud83c\uddf5", dialCode: "+977", pattern: /^[0-9]{10}$/, placeholder: "9841 234567" },
  { name: "Netherlands", code: "NL", flag: "\ud83c\uddf3\ud83c\uddf1", dialCode: "+31", pattern: /^[0-9]{9}$/, placeholder: "6 1234 5678" },
  { name: "New Zealand", code: "NZ", flag: "\ud83c\uddf3\ud83c\uddff", dialCode: "+64", pattern: /^[0-9]{8,10}$/, placeholder: "21 123 4567" },
  { name: "Nicaragua", code: "NI", flag: "\ud83c\uddf3\ud83c\uddee", dialCode: "+505", pattern: /^[0-9]{8}$/, placeholder: "8123 4567" },
  { name: "Niger", code: "NE", flag: "\ud83c\uddf3\ud83c\uddea", dialCode: "+227", pattern: /^[0-9]{8}$/, placeholder: "93 12 3456" },
  { name: "Nigeria", code: "NG", flag: "\ud83c\uddf3\ud83c\uddec", dialCode: "+234", pattern: /^[0-9]{10}$/, placeholder: "802 123 4567" },
  { name: "North Korea", code: "KP", flag: "\ud83c\uddf0\ud83c\uddf5", dialCode: "+850", pattern: /^[0-9]{8,10}$/, placeholder: "192 123 4567" },
  { name: "North Macedonia", code: "MK", flag: "\ud83c\uddf2\ud83c\uddf0", dialCode: "+389", pattern: /^[0-9]{8}$/, placeholder: "72 345 678" },
  { name: "Norway", code: "NO", flag: "\ud83c\uddf3\ud83c\uddf4", dialCode: "+47", pattern: /^[0-9]{8}$/, placeholder: "406 12 345" },
  { name: "Oman", code: "OM", flag: "\ud83c\uddf4\ud83c\uddf2", dialCode: "+968", pattern: /^[0-9]{8}$/, placeholder: "9212 3456" },
  { name: "Pakistan", code: "PK", flag: "\ud83c\uddf5\ud83c\uddf0", dialCode: "+92", pattern: /^[0-9]{10}$/, placeholder: "301 234 5678" },
  { name: "Palau", code: "PW", flag: "\ud83c\uddf5\ud83c\uddfc", dialCode: "+680", pattern: /^[0-9]{7}$/, placeholder: "620 1234" },
  { name: "Palestine", code: "PS", flag: "\ud83c\uddf5\ud83c\uddf8", dialCode: "+970", pattern: /^[0-9]{9}$/, placeholder: "599 123 456" },
  { name: "Panama", code: "PA", flag: "\ud83c\uddf5\ud83c\udde6", dialCode: "+507", pattern: /^[0-9]{7,8}$/, placeholder: "6123 4567" },
  { name: "Papua New Guinea", code: "PG", flag: "\ud83c\uddf5\ud83c\uddec", dialCode: "+675", pattern: /^[0-9]{7,8}$/, placeholder: "7012 3456" },
  { name: "Paraguay", code: "PY", flag: "\ud83c\uddf5\ud83c\uddfe", dialCode: "+595", pattern: /^[0-9]{9}$/, placeholder: "961 456 789" },
  { name: "Peru", code: "PE", flag: "\ud83c\uddf5\ud83c\uddea", dialCode: "+51", pattern: /^[0-9]{9}$/, placeholder: "912 345 678" },
  { name: "Philippines", code: "PH", flag: "\ud83c\uddf5\ud83c\udded", dialCode: "+63", pattern: /^[0-9]{10}$/, placeholder: "905 123 4567" },
  { name: "Poland", code: "PL", flag: "\ud83c\uddf5\ud83c\uddf1", dialCode: "+48", pattern: /^[0-9]{9}$/, placeholder: "512 345 678" },
  { name: "Portugal", code: "PT", flag: "\ud83c\uddf5\ud83c\uddf9", dialCode: "+351", pattern: /^[0-9]{9}$/, placeholder: "912 345 678" },
  { name: "Qatar", code: "QA", flag: "\ud83c\uddf6\ud83c\udde6", dialCode: "+974", pattern: /^[0-9]{8}$/, placeholder: "3312 3456" },
  { name: "Romania", code: "RO", flag: "\ud83c\uddf7\ud83c\uddf4", dialCode: "+40", pattern: /^[0-9]{9}$/, placeholder: "712 034 567" },
  { name: "Russia", code: "RU", flag: "\ud83c\uddf7\ud83c\uddfa", dialCode: "+7", pattern: /^[0-9]{10}$/, placeholder: "912 345 6789" },
  { name: "Rwanda", code: "RW", flag: "\ud83c\uddf7\ud83c\uddfc", dialCode: "+250", pattern: /^[0-9]{9}$/, placeholder: "720 123 456" },
  { name: "Saint Kitts and Nevis", code: "KN", flag: "\ud83c\uddf0\ud83c\uddf3", dialCode: "+1869", pattern: /^[0-9]{7}$/, placeholder: "765 1234" },
  { name: "Saint Lucia", code: "LC", flag: "\ud83c\uddf1\ud83c\udde8", dialCode: "+1758", pattern: /^[0-9]{7}$/, placeholder: "284 5678" },
  { name: "Saint Vincent", code: "VC", flag: "\ud83c\uddfb\ud83c\udde8", dialCode: "+1784", pattern: /^[0-9]{7}$/, placeholder: "430 1234" },
  { name: "Samoa", code: "WS", flag: "\ud83c\uddfc\ud83c\uddf8", dialCode: "+685", pattern: /^[0-9]{5,7}$/, placeholder: "72 12345" },
  { name: "San Marino", code: "SM", flag: "\ud83c\uddf8\ud83c\uddf2", dialCode: "+378", pattern: /^[0-9]{8,10}$/, placeholder: "66 12 12 12" },
  { name: "São Tomé and Príncipe", code: "ST", flag: "\ud83c\uddf8\ud83c\uddf9", dialCode: "+239", pattern: /^[0-9]{7}$/, placeholder: "981 2345" },
  { name: "Saudi Arabia", code: "SA", flag: "\ud83c\uddf8\ud83c\udde6", dialCode: "+966", pattern: /^[0-9]{9}$/, placeholder: "51 234 5678" },
  { name: "Senegal", code: "SN", flag: "\ud83c\uddf8\ud83c\uddf3", dialCode: "+221", pattern: /^[0-9]{9}$/, placeholder: "70 123 4567" },
  { name: "Serbia", code: "RS", flag: "\ud83c\uddf7\ud83c\uddf8", dialCode: "+381", pattern: /^[0-9]{8,9}$/, placeholder: "60 1234567" },
  { name: "Seychelles", code: "SC", flag: "\ud83c\uddf8\ud83c\udde8", dialCode: "+248", pattern: /^[0-9]{7}$/, placeholder: "251 0123" },
  { name: "Sierra Leone", code: "SL", flag: "\ud83c\uddf8\ud83c\uddf1", dialCode: "+232", pattern: /^[0-9]{8}$/, placeholder: "25 123456" },
  { name: "Singapore", code: "SG", flag: "\ud83c\uddf8\ud83c\uddec", dialCode: "+65", pattern: /^[0-9]{8}$/, placeholder: "8123 4567" },
  { name: "Slovakia", code: "SK", flag: "\ud83c\uddf8\ud83c\uddf0", dialCode: "+421", pattern: /^[0-9]{9}$/, placeholder: "912 123 456" },
  { name: "Slovenia", code: "SI", flag: "\ud83c\uddf8\ud83c\uddee", dialCode: "+386", pattern: /^[0-9]{8}$/, placeholder: "31 234 567" },
  { name: "Solomon Islands", code: "SB", flag: "\ud83c\uddf8\ud83c\udde7", dialCode: "+677", pattern: /^[0-9]{5,7}$/, placeholder: "74 21234" },
  { name: "Somalia", code: "SO", flag: "\ud83c\uddf8\ud83c\uddf4", dialCode: "+252", pattern: /^[0-9]{7,8}$/, placeholder: "90 123 456" },
  { name: "South Africa", code: "ZA", flag: "\ud83c\uddff\ud83c\udde6", dialCode: "+27", pattern: /^[0-9]{9}$/, placeholder: "71 123 4567" },
  { name: "South Korea", code: "KR", flag: "\ud83c\uddf0\ud83c\uddf7", dialCode: "+82", pattern: /^[0-9]{9,10}$/, placeholder: "10 1234 5678" },
  { name: "South Sudan", code: "SS", flag: "\ud83c\uddf8\ud83c\uddf8", dialCode: "+211", pattern: /^[0-9]{9}$/, placeholder: "977 123 456" },
  { name: "Spain", code: "ES", flag: "\ud83c\uddea\ud83c\uddf8", dialCode: "+34", pattern: /^[0-9]{9}$/, placeholder: "612 887 002" },
  { name: "Sri Lanka", code: "LK", flag: "\ud83c\uddf1\ud83c\uddf0", dialCode: "+94", pattern: /^[0-9]{9}$/, placeholder: "77 123 4567" },
  { name: "Sudan", code: "SD", flag: "\ud83c\uddf8\ud83c\udde9", dialCode: "+249", pattern: /^[0-9]{9}$/, placeholder: "91 123 1234" },
  { name: "Suriname", code: "SR", flag: "\ud83c\uddf8\ud83c\uddf7", dialCode: "+597", pattern: /^[0-9]{6,7}$/, placeholder: "741 2345" },
  { name: "Sweden", code: "SE", flag: "\ud83c\uddf8\ud83c\uddea", dialCode: "+46", pattern: /^[0-9]{9}$/, placeholder: "70 998 4421" },
  { name: "Switzerland", code: "CH", flag: "\ud83c\udde8\ud83c\udded", dialCode: "+41", pattern: /^[0-9]{9}$/, placeholder: "78 123 4567" },
  { name: "Syria", code: "SY", flag: "\ud83c\uddf8\ud83c\uddfe", dialCode: "+963", pattern: /^[0-9]{8,9}$/, placeholder: "944 567 890" },
  { name: "Taiwan", code: "TW", flag: "\ud83c\uddf9\ud83c\uddfc", dialCode: "+886", pattern: /^[0-9]{9}$/, placeholder: "912 345 678" },
  { name: "Tajikistan", code: "TJ", flag: "\ud83c\uddf9\ud83c\uddef", dialCode: "+992", pattern: /^[0-9]{9}$/, placeholder: "917 12 3456" },
  { name: "Tanzania", code: "TZ", flag: "\ud83c\uddf9\ud83c\uddff", dialCode: "+255", pattern: /^[0-9]{9}$/, placeholder: "621 234 567" },
  { name: "Thailand", code: "TH", flag: "\ud83c\uddf9\ud83c\udded", dialCode: "+66", pattern: /^[0-9]{9}$/, placeholder: "81 234 5678" },
  { name: "Timor-Leste", code: "TL", flag: "\ud83c\uddf9\ud83c\uddf1", dialCode: "+670", pattern: /^[0-9]{7,8}$/, placeholder: "7721 2345" },
  { name: "Togo", code: "TG", flag: "\ud83c\uddf9\ud83c\uddec", dialCode: "+228", pattern: /^[0-9]{8}$/, placeholder: "90 12 3456" },
  { name: "Tonga", code: "TO", flag: "\ud83c\uddf9\ud83c\uddf4", dialCode: "+676", pattern: /^[0-9]{5,7}$/, placeholder: "77 15012" },
  { name: "Trinidad and Tobago", code: "TT", flag: "\ud83c\uddf9\ud83c\uddf9", dialCode: "+1868", pattern: /^[0-9]{7}$/, placeholder: "291 1234" },
  { name: "Tunisia", code: "TN", flag: "\ud83c\uddf9\ud83c\uddf3", dialCode: "+216", pattern: /^[0-9]{8}$/, placeholder: "20 123 456" },
  { name: "Turkey", code: "TR", flag: "\ud83c\uddf9\ud83c\uddf7", dialCode: "+90", pattern: /^[0-9]{10}$/, placeholder: "501 234 5678" },
  { name: "Turkmenistan", code: "TM", flag: "\ud83c\uddf9\ud83c\uddf2", dialCode: "+993", pattern: /^[0-9]{8}$/, placeholder: "66 12 3456" },
  { name: "Tuvalu", code: "TV", flag: "\ud83c\uddf9\ud83c\uddfb", dialCode: "+688", pattern: /^[0-9]{5,6}$/, placeholder: "90 1234" },
  { name: "Uganda", code: "UG", flag: "\ud83c\uddfa\ud83c\uddec", dialCode: "+256", pattern: /^[0-9]{9}$/, placeholder: "712 345 678" },
  { name: "Ukraine", code: "UA", flag: "\ud83c\uddfa\ud83c\udde6", dialCode: "+380", pattern: /^[0-9]{9}$/, placeholder: "50 123 4567" },
  { name: "United Arab Emirates", code: "AE", flag: "\ud83c\udde6\ud83c\uddea", dialCode: "+971", pattern: /^[0-9]{9}$/, placeholder: "50 442 9981" },
  { name: "United Kingdom", code: "GB", flag: "\ud83c\uddec\ud83c\udde7", dialCode: "+44", pattern: /^[0-9]{10}$/, placeholder: "7700 900077" },
  { name: "United States", code: "US", flag: "\ud83c\uddfa\ud83c\uddf8", dialCode: "+1", pattern: /^[0-9]{10}$/, placeholder: "202 555 0123" },
  { name: "Uruguay", code: "UY", flag: "\ud83c\uddfa\ud83c\uddfe", dialCode: "+598", pattern: /^[0-9]{8}$/, placeholder: "94 231 234" },
  { name: "Uzbekistan", code: "UZ", flag: "\ud83c\uddfa\ud83c\uddff", dialCode: "+998", pattern: /^[0-9]{9}$/, placeholder: "91 234 5678" },
  { name: "Vanuatu", code: "VU", flag: "\ud83c\uddfb\ud83c\uddfa", dialCode: "+678", pattern: /^[0-9]{5,7}$/, placeholder: "591 2345" },
  { name: "Vatican City", code: "VA", flag: "\ud83c\uddfb\ud83c\udde6", dialCode: "+379", pattern: /^[0-9]{10}$/, placeholder: "06 698 12345" },
  { name: "Venezuela", code: "VE", flag: "\ud83c\uddfb\ud83c\uddea", dialCode: "+58", pattern: /^[0-9]{10}$/, placeholder: "412 123 4567" },
  { name: "Vietnam", code: "VN", flag: "\ud83c\uddfb\ud83c\uddf3", dialCode: "+84", pattern: /^[0-9]{9,10}$/, placeholder: "91 234 56 78" },
  { name: "Yemen", code: "YE", flag: "\ud83c\uddfe\ud83c\uddea", dialCode: "+967", pattern: /^[0-9]{7,9}$/, placeholder: "712 345 678" },
  { name: "Zambia", code: "ZM", flag: "\ud83c\uddff\ud83c\uddf2", dialCode: "+260", pattern: /^[0-9]{9}$/, placeholder: "955 123 456" },
  { name: "Zimbabwe", code: "ZW", flag: "\ud83c\uddff\ud83c\uddfc", dialCode: "+263", pattern: /^[0-9]{9}$/, placeholder: "71 234 5678" },
];

export function AddTouristSheet({
  open,
  onOpenChange,
  onAdd,
  mode = "confirmed",
  initialData,
  agents = [],
  drivers = [],
  hotels = [],
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (tourist: Tourist) => void;
  mode?: "lead" | "confirmed";
  initialData?: Tourist;
  agents: any[];
  drivers: any[];
  hotels?: any[];
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCountry, setSelectedCountry] = useState(() => COUNTRIES.find(c => c.code === "GB") || COUNTRIES[0]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryPopoverOpen, setCountryPopoverOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");
  const [memberPopoverOpen, setMemberPopoverOpen] = useState<Record<number, boolean>>({});
  const [memberSearchQuery, setMemberSearchQuery] = useState<Record<number, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    countryCode: "",
    passport: "",
    phone: "",
    email: "",
    pax: 1,
    arrival: "",
    departure: "",
    duration: "",
    status: "Upcoming",
    agent: "All Agents",
    driver: "All Drivers",
    group: [] as any[],
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        // Parse main phone number
        let phoneVal = initialData.phone || "";
        if (phoneVal.startsWith("+")) {
          const sorted = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
          const phoneDialCodeCountry = sorted.find(c => phoneVal.startsWith(c.dialCode));
          if (phoneDialCodeCountry) {
            phoneVal = phoneVal.slice(phoneDialCodeCountry.dialCode.length).trim();
          }
        }

        let matchedCountry = COUNTRIES.find(c => c.code === initialData.countryCode);
        if (matchedCountry) {
          setSelectedCountry(matchedCountry);
        } else {
          setSelectedCountry(COUNTRIES.find(c => c.code === "GB") || COUNTRIES[0]);
        }

        // Parse group member phone numbers
        const parsedGroup = (initialData.group || []).map((member: any) => {
          let mPhone = member.phone || "";
          let mMatched = COUNTRIES.find(c => c.code === member.countryCode);
          if (!mMatched && mPhone.startsWith("+")) {
            const sorted = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
            mMatched = sorted.find(c => mPhone.startsWith(c.dialCode));
          }
          if (mMatched) {
            if (mPhone.startsWith(mMatched.dialCode)) {
              mPhone = mPhone.slice(mMatched.dialCode.length).trim();
            }
            return {
              ...member,
              phone: mPhone,
              countryCode: mMatched.code
            };
          }
          return {
            ...member,
            phone: mPhone,
            countryCode: member.countryCode || "GB"
          };
        });

        setFormData({
          name: initialData.name || "",
          country: initialData.country || "",
          countryCode: initialData.countryCode || "",
          passport: initialData.passport || "",
          phone: phoneVal,
          email: initialData.email || "",
          pax: initialData.pax || 1,
          arrival: initialData.arrival || "",
          departure: (initialData as any).departure || "",
          duration: initialData.duration || "",
          status: initialData.status || "Upcoming",
          agent: initialData.agent || "All Agents",
          driver: initialData.driver || "All Drivers",
          group: parsedGroup,
        });
        setItinerary(initialData.itinerary || []);
      } else {
        setFormData({
          name: "",
          country: "",
          countryCode: "",
          passport: "",
          phone: "",
          email: "",
          pax: 1,
          arrival: "",
          duration: "",
          departure: "",
          status: "Upcoming",
          agent: "All Agents",
          driver: "All Drivers",
          group: [],
        });
        setSelectedCountry(COUNTRIES.find(c => c.code === "GB") || COUNTRIES[0]);
        setItinerary([]);
      }
      setMemberPopoverOpen({});
      setMemberSearchQuery({});
      setErrors({});
    }
  }, [open, initialData]);

  useEffect(() => {
    if (!popoverOpen) {
      setSearchQuery("");
    }
  }, [popoverOpen]);

  useEffect(() => {
    if (!countryPopoverOpen) {
      setCountrySearchQuery("");
    }
  }, [countryPopoverOpen]);

  useEffect(() => {
    if (formData.arrival && formData.departure) {
      const start = new Date(formData.arrival);
      const end = new Date(formData.departure);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
        const diff = end.getTime() - start.getTime();
        const days = Math.ceil(diff / (1000 * 3600 * 24)) + 1; // inclusive of start day
        if (formData.duration !== `${days} Days`) {
          setFormData(prev => ({ ...prev, duration: `${days} Days` }));
        }
      }
    }
  }, [formData.arrival, formData.departure]);

  const [itinerary, setItinerary] = useState<any[]>([]);
  const [itineraryText, setItineraryText] = useState("");
  const [activeTab, setActiveTab] = useState("text");

  const handleGenerate = async (type: 'text' | 'pdf' | 'manual_pdf') => {
    setIsGenerating(true);

    try {
      if (type === 'manual_pdf') {
        if (!itinerary || itinerary.length === 0) {
          alert("Please add at least one day to the itinerary before generating a PDF.");
          return;
        }

        // Convert the manual itinerary into a clear text prompt for Gemini to expand
        let promptText = `Please generate an itinerary for the following guest based EXACTLY on these details:\n\n`;
        promptText += `Guest Name: ${formData.name || "Client"}\n`;
        if (formData.arrival) promptText += `Arrival: ${formData.arrival}\n`;
        if (formData.departure) promptText += `Departure: ${formData.departure}\n`;
        if (formData.duration) promptText += `Duration: ${formData.duration}\n\n`;

        itinerary.forEach((day: any) => {
          promptText += `Day ${day.day}: ${day.title || ""}\n`;
          promptText += `Hotel: ${day.hotel || "Please assign a suitable luxury hotel"}\n`;
          promptText += `Locations and Activities:\n`;
          if (day.destinations && day.destinations.length > 0) {
            day.destinations.forEach((d: any) => {
              promptText += `- Location: ${d.location || "Various"}\n`;
              if (d.activities && d.activities.length > 0) {
                const acts = Array.isArray(d.activities) ? d.activities : [d.activities];
                acts.forEach((act: string) => {
                  if (act.trim()) promptText += `  * ${act}\n`;
                });
              }
            });
          }
          promptText += `\n`;
        });

        // Send this prompt to the AI generator to get the rich descriptions and images
        const response = await fetch("http://localhost:8000/api/itinerary/generate-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ raw_text: promptText }),
        });

        if (!response.ok) {
          let errMsg = `Server error: ${response.status}`;
          try {
            const errData = await response.json();
            errMsg = errData.detail || errMsg;
          } catch (e) { }
          throw new Error(errMsg);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${formData.name || "Client"}_Itinerary.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else if (type === 'text') {
        // Full pipeline: Raw text → Gemini parse → Pexels images → PDF download
        // (Exactly like the sample project's /generate-from-raw endpoint)
        const response = await fetch("http://localhost:8000/api/itinerary/generate-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ raw_text: itineraryText }),
        });

        if (!response.ok) {
          let errMsg = `Server error: ${response.status}`;
          try {
            const errData = await response.json();
            errMsg = errData.detail || errMsg;
          } catch (e) { }
          throw new Error(errMsg);
        }

        // Backend returns a PDF file directly — download it
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${formData.name || "Client"}_Itinerary.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else if (type === 'pdf') {
        if (!pdfFile) {
          alert("Please select a PDF file first.");
          return;
        }

        setUploadProgress(0);

        // Simulate progress while waiting for the Gemini API
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            // Fast up to 30% (upload phase)
            if (prev < 30) return prev + 10;
            // Slow up to 90% (AI parsing phase)
            if (prev < 90) return prev + 2;
            return prev;
          });
        }, 500);

        try {
          // Upload the PDF to the backend for text extraction + Gemini parsing
          const formPayload = new FormData();
          formPayload.append("file", pdfFile);

          const response = await fetch("http://localhost:8000/api/itinerary/extract-from-pdf", {
            method: "POST",
            body: formPayload,
          });

          clearInterval(progressInterval);
          setUploadProgress(100);

          if (!response.ok) {
            let errMsg = `Server error: ${response.status}`;
            try {
              const errData = await response.json();
              errMsg = errData.detail || errMsg;
            } catch (e) { }
            throw new Error(errMsg);
          }

          const data = await response.json();

          // Auto-fill form fields from extracted data (only if data is present)
          setFormData(prev => ({
            ...prev,
            ...(data.guest_name ? { name: data.guest_name } : {}),
            ...(data.duration ? { duration: data.duration } : {}),
            ...(data.arrival ? { arrival: data.arrival } : {}),
            ...(data.departure ? { departure: data.departure } : {}),
          }));

          // Auto-fill itinerary from extracted days
          if (data.days && Array.isArray(data.days)) {
            const formattedItinerary = data.days.map((day: any) => {
              const hotelInfo = data.hotels?.find((h: any) =>
                h.destination?.toLowerCase() === day.destination?.toLowerCase()
              )?.hotel_name || "";
              return {
                day: day.day_number || 1,
                title: day.ui_title || day.title || day.destination || "Day Tour",
                hotel: hotelInfo,
                hotelEmail: "",
                destinations: [
                  {
                    location: (day.ui_destinations && day.ui_destinations[0]) || day.ui_title || day.destination || "Various",
                    activities: day.ui_activities && day.ui_activities.length > 0
                      ? day.ui_activities
                      : (day.description ? [day.description] : [])
                  }
                ]
              };
            });
            setItinerary(formattedItinerary);
          }

          // Clear the file and switch to manual tab to review
          setTimeout(() => {
            setPdfFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            setActiveTab("manual");
            setUploadProgress(0);
          }, 800);
        } catch (error: any) {
          clearInterval(progressInterval);
          setUploadProgress(0);
          throw error; // Re-throw to be caught by the outer catch
        }
      }
    } catch (error: any) {
      console.error("Error generating itinerary:", error);
      alert(error.message || "Failed to generate itinerary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectCountry = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setFormData(prev => ({
      ...prev,
      country: country.name,
      countryCode: country.code
    }));
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (mode === "confirmed") {
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.countryCode) newErrors.countryCode = "Code is required";
      if (!formData.passport) {
        newErrors.passport = "Passport is required";
      } else {
        const passportRegex = /^[a-zA-Z0-9]{6,15}$/;
        if (!passportRegex.test(formData.passport.trim())) {
          newErrors.passport = "Passport must be 6-15 alphanumeric characters";
        }
      }
      if (!formData.phone) {
        newErrors.phone = "Phone is required";
      } else {
        const localNumber = formData.phone.replace(/[\s\-\(\)]/g, "");
        if (!selectedCountry.pattern.test(localNumber)) {
          newErrors.phone = `Invalid phone for ${selectedCountry.name}. Example: ${selectedCountry.placeholder}`;
        }
      }
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email.trim())) {
          newErrors.email = "Invalid email format";
        }
      }
      if (!formData.arrival) newErrors.arrival = "Arrival date is required";
      if (!formData.departure) newErrors.departure = "Departure date is required";
      if (!formData.duration) newErrors.duration = "Duration is required";
      if (formData.agent === "All Agents") newErrors.agent = "Agent is required";
      if (formData.driver === "All Drivers") newErrors.driver = "Driver is required";

      if (formData.pax > 1) {
        for (let i = 0; i < formData.pax - 1; i++) {
          const member = formData.group[i];
          if (!member || !member.name?.trim()) {
            newErrors[`group_${i}_name`] = "Name is required";
          }
          if (!member || !member.passport?.trim()) {
            newErrors[`group_${i}_passport`] = "Passport is required";
          } else {
            const passportRegex = /^[a-zA-Z0-9]{6,15}$/;
            if (!passportRegex.test(member.passport.trim())) {
              newErrors[`group_${i}_passport`] = "Passport must be 6-15 alphanumeric characters";
            }
          }
          if (!member || !member.phone?.trim()) {
            newErrors[`group_${i}_phone`] = "Phone is required";
          } else {
            const memberCountry = COUNTRIES.find(c => c.code === member.countryCode) || COUNTRIES.find(c => c.code === "GB") || COUNTRIES[0];
            const localNumber = member.phone.replace(/[\s\-\(\)]/g, "");
            if (!memberCountry.pattern.test(localNumber)) {
              newErrors[`group_${i}_phone`] = `Invalid phone. Example: ${memberCountry.placeholder}`;
            }
          }
          if (!member || !member.email?.trim()) {
            newErrors[`group_${i}_email`] = "Email is required";
          } else {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(member.email.trim())) {
              newErrors[`group_${i}_email`] = "Invalid email format";
            }
          }
        }
      }
    } else {
      if (formData.passport) {
        const passportRegex = /^[a-zA-Z0-9]{6,15}$/;
        if (!passportRegex.test(formData.passport.trim())) {
          newErrors.passport = "Passport must be 6-15 alphanumeric characters";
        }
      }
      if (formData.phone) {
        const localNumber = formData.phone.replace(/[\s\-\(\)]/g, "");
        if (!selectedCountry.pattern.test(localNumber)) {
          newErrors.phone = `Invalid phone for ${selectedCountry.name}. Example: ${selectedCountry.placeholder}`;
        }
      }
      if (formData.email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email.trim())) {
          newErrors.email = "Invalid email format";
        }
      }
      if (formData.pax > 1) {
        for (let i = 0; i < formData.pax - 1; i++) {
          const member = formData.group[i];
          if (member) {
            if (member.passport?.trim()) {
              const passportRegex = /^[a-zA-Z0-9]{6,15}$/;
              if (!passportRegex.test(member.passport.trim())) {
                newErrors[`group_${i}_passport`] = "Passport must be 6-15 alphanumeric characters";
              }
            }
            if (member.phone?.trim()) {
              const memberCountry = COUNTRIES.find(c => c.code === member.countryCode) || COUNTRIES.find(c => c.code === "GB") || COUNTRIES[0];
              const localNumber = member.phone.replace(/[\s\-\(\)]/g, "");
              if (!memberCountry.pattern.test(localNumber)) {
                newErrors[`group_${i}_phone`] = `Invalid phone. Example: ${memberCountry.placeholder}`;
              }
            }
            if (member.email?.trim()) {
              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              if (!emailRegex.test(member.email.trim())) {
                newErrors[`group_${i}_email`] = "Invalid email format";
              }
            }
          }
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Unable to save", {
        description: "Please check the form for errors and missing required fields.",
      });
      return;
    }

    setErrors({});

    const newTourist: Tourist = {
      id: initialData ? initialData.id : "t" + Math.floor(Math.random() * 10000),
      name: formData.name,
      country: formData.country || "TBD",
      countryCode: formData.countryCode || "UN",
      pax: Number(formData.pax) || 1,
      arrival: formData.arrival || "TBD",
      departure: formData.departure || "",
      duration: formData.duration || "TBD",
      status: formData.status as any,
      agent: formData.agent !== "All Agents" ? formData.agent : "Direct",
      driver: formData.driver !== "All Drivers" ? formData.driver : "TBD",
      passport: formData.passport || "N/A",
      phone: formData.phone ? `${selectedCountry.dialCode} ${formData.phone.trim()}` : "N/A",
      email: formData.email || "N/A",
      group: (formData.group || []).slice(0, formData.pax - 1).map((g: any) => {
        const memberCountry = COUNTRIES.find(c => c.code === g.countryCode) || COUNTRIES.find(c => c.code === "GB") || COUNTRIES[0];
        return {
          name: g.name,
          passport: g.passport,
          email: g.email || null,
          phone: g.phone ? `${memberCountry.dialCode} ${g.phone.trim()}` : "",
          countryCode: g.countryCode || memberCountry.code,
        };
      }),
      currentLocation: initialData ? initialData.currentLocation : "TBD",
      itinerary: itinerary,
      isLead: mode === "lead",
    };
    onAdd(newTourist);
    onOpenChange(false);
  };

  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.dialCode.includes(searchQuery) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCountryList = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(countrySearchQuery.toLowerCase())
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] w-full p-0 flex flex-col h-full bg-background border-l border-border">
        <SheetHeader className="px-6 py-4 border-b border-border bg-card">
          <SheetTitle>{mode === "lead" ? "Add New Inquiry" : (initialData ? "Confirm Tour" : "Add New Client")}</SheetTitle>
          <SheetDescription>
            {mode === "lead"
              ? "Create a new lead profile. Only the name is mandatory."
              : "Create a confirmed client profile. All personal details are required."}
          </SheetDescription>
          {/* Datalist for hotel autocomplete */}
          <datalist id="hotels-list">
            {hotels.map(h => (
              <option key={h.id} value={h.hotel_name} />
            ))}
          </datalist>
        </SheetHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="grid gap-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <Settings2 className="h-4 w-4" />
                Personal Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={cn(errors.name && "text-destructive")}>Full Name *</Label>
                  <Input className={cn(errors.name && "border-destructive focus-visible:ring-destructive")} value={formData.name} onChange={e => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: "" }); }} placeholder="e.g. John Doe" />
                  {errors.name && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.name}</div>}
                </div>
                <div className="space-y-2 col-span-2">
                  <Label className={cn((errors.country || errors.countryCode) && "text-destructive")}>
                    Country / Nationality {mode === "confirmed" && "*"}
                  </Label>
                  <Popover open={countryPopoverOpen} onOpenChange={setCountryPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "flex items-center justify-between w-full h-9 px-3 rounded-md border border-input bg-background text-sm cursor-pointer hover:bg-muted/50",
                          (errors.country || errors.countryCode) && "border-destructive focus-visible:ring-destructive"
                        )}
                      >
                        {formData.country ? (
                          <div className="flex items-center gap-2">
                            <img
                              src={`https://flagcdn.com/w20/${formData.countryCode.toLowerCase()}.png`}
                              width="16"
                              height="12"
                              alt=""
                              className="object-contain shrink-0"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                            <span className="font-medium text-foreground">{formData.country} ({formData.countryCode})</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Select Country...</span>
                        )}
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[280px] flex flex-col z-[100] bg-card border border-border rounded-md shadow-md" align="start">
                      <div className="p-2 border-b border-border">
                        <Input
                          placeholder="Search country..."
                          value={countrySearchQuery}
                          onChange={(e) => setCountrySearchQuery(e.target.value)}
                          className="h-8 text-xs"
                          autoFocus
                        />
                      </div>
                      <div className="overflow-y-auto flex-1 max-h-[200px] py-1" style={{ scrollbarWidth: 'thin' }} onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
                        {filteredCountryList.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                country: c.name,
                                countryCode: c.code
                              }));
                              setSelectedCountry(c);
                              if (errors.country) setErrors(prev => ({ ...prev, country: "" }));
                              if (errors.countryCode) setErrors(prev => ({ ...prev, countryCode: "" }));
                              setCountryPopoverOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 rounded-sm cursor-pointer"
                          >
                            <img
                              src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                              width="16"
                              height="12"
                              alt=""
                              className="object-contain shrink-0"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                            <span className="font-semibold text-slate-700 dark:text-slate-300">({c.code})</span>
                            <span className="text-slate-500 truncate">{c.name}</span>
                          </button>
                        ))}
                        {filteredCountryList.length === 0 && (
                          <div className="text-[10px] text-muted-foreground text-center py-2">No countries found</div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                  {(errors.country || errors.countryCode) && (
                    <div className="text-[10px] text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.country || errors.countryCode}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.passport && "text-destructive")}>Passport Number {mode === "confirmed" && "*"}</Label>
                  <Input className={cn(errors.passport && "border-destructive focus-visible:ring-destructive")} value={formData.passport} onChange={e => { setFormData({ ...formData, passport: e.target.value }); if (errors.passport) setErrors({ ...errors, passport: "" }); }} placeholder="e.g. P1234567" />
                  {errors.passport && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.passport}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.phone && "text-destructive")}>Phone {mode === "confirmed" && "*"}</Label>
                  <div className="flex gap-0">
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            "flex items-center gap-1 h-9 px-2 rounded-l-md border border-r-0 border-input bg-muted/50 hover:bg-muted text-xs shrink-0 cursor-pointer",
                            errors.phone && "border-destructive"
                          )}
                        >
                          <img
                            src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                            width="16"
                            height="12"
                            alt=""
                            className="object-contain shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                          <span className="font-medium text-foreground">{selectedCountry.dialCode}</span>
                          <ChevronDown className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-[260px] flex flex-col z-[100] bg-card border border-border rounded-md shadow-md" align="start">
                        <div className="p-2 border-b border-border">
                          <Input
                            placeholder="Search country..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-8 text-xs"
                            autoFocus
                          />
                        </div>
                        <div className="overflow-y-auto flex-1 max-h-[200px] py-1" style={{ scrollbarWidth: 'thin' }} onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
                          {filteredCountries.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => {
                                handleSelectCountry(c);
                                setPopoverOpen(false);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 rounded-sm cursor-pointer"
                            >
                              <img
                                src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                                width="16"
                                height="12"
                                alt=""
                                className="object-contain shrink-0"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = "none";
                                }}
                              />
                              <span className="font-semibold text-slate-700 dark:text-slate-300">{c.dialCode}</span>
                              <span className="text-slate-500 truncate">{c.name}</span>
                            </button>
                          ))}
                          {filteredCountries.length === 0 && (
                            <div className="text-[10px] text-muted-foreground text-center py-2">No countries found</div>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input
                      className={cn(
                        "rounded-l-none",
                        errors.phone && "border-destructive focus-visible:ring-destructive"
                      )}
                      value={formData.phone}
                      onChange={e => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      placeholder={`e.g. ${selectedCountry.placeholder}`}
                    />
                  </div>
                  {errors.phone && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.phone}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.email && "text-destructive")}>Email {mode === "confirmed" && "*"}</Label>
                  <Input className={cn(errors.email && "border-destructive focus-visible:ring-destructive")} value={formData.email} onChange={e => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: "" }); }} placeholder="john@example.com" />
                  {errors.email && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.email}</div>}
                </div>
                <div className="space-y-2">
                  <Label>Pax (Group Size)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.pax}
                    onChange={e => {
                      let val = e.target.value;
                      if (val !== "" && Number(val) > 100) val = "100";
                      setFormData({ ...formData, pax: val as any });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.agent && "text-destructive")}>Agent {mode === "confirmed" && "*"}</Label>
                  <Select value={formData.agent} onValueChange={v => { setFormData({ ...formData, agent: v }); if (errors.agent) setErrors({ ...errors, agent: "" }); }}>
                    <SelectTrigger className={cn(errors.agent && "border-destructive focus:ring-destructive")}><SelectValue placeholder="Select Agent" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Agents">Select Agent</SelectItem>
                      {agents.map((a: any) => (
                        <SelectItem key={a.id} value={a.agent_name || a.name}>{a.agent_name || a.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.agent && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.agent}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.driver && "text-destructive")}>Driver / Guide {mode === "confirmed" && "*"}</Label>
                  <Select value={formData.driver} onValueChange={v => { setFormData({ ...formData, driver: v }); if (errors.driver) setErrors({ ...errors, driver: "" }); }}>
                    <SelectTrigger className={cn(errors.driver && "border-destructive focus:ring-destructive")}><SelectValue placeholder="Select Driver" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Drivers">Select Driver / Guide</SelectItem>
                      {drivers.map((d: any) => (
                        <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.driver && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.driver}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.arrival && "text-destructive")}>Arrival Date {mode === "confirmed" && "*"}</Label>
                  <Input type="date" className={cn("dark:[color-scheme:dark]", errors.arrival && "border-destructive focus-visible:ring-destructive")} value={formData.arrival} onChange={e => { setFormData({ ...formData, arrival: e.target.value }); if (errors.arrival) setErrors({ ...errors, arrival: "" }); }} />
                  {errors.arrival && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.arrival}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.departure && "text-destructive")}>Departure Date {mode === "confirmed" && "*"}</Label>
                  <Input type="date" className={cn("dark:[color-scheme:dark]", errors.departure && "border-destructive focus-visible:ring-destructive")} value={formData.departure} onChange={e => { setFormData({ ...formData, departure: e.target.value }); if (errors.departure) setErrors({ ...errors, departure: "" }); }} />
                  {errors.departure && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.departure}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.duration && "text-destructive")}>Duration {mode === "confirmed" && "*"}</Label>
                  <Input className={cn(errors.duration && "border-destructive focus-visible:ring-destructive")} value={formData.duration} onChange={e => { setFormData({ ...formData, duration: e.target.value }); if (errors.duration) setErrors({ ...errors, duration: "" }); }} placeholder="e.g. 7 Days" />
                  {errors.duration && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.duration}</div>}
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={v => setFormData({ ...formData, status: v })}>
                    <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Tour">On Tour</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Group Details */}
            {formData.pax > 1 && (
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Users className="h-4 w-4" />
                  Other Group Members
                </h3>
                <div className="space-y-4">
                  {Array.from({ length: formData.pax - 1 }).map((_, i) => (
                    <div key={i} className="space-y-3 p-4 border border-border rounded-md bg-muted/20">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Member {i + 1}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className={cn("text-xs", errors[`group_${i}_name`] && "text-destructive")}>Name {mode === "confirmed" && "*"}</Label>
                          <Input className={cn("h-8 text-sm", errors[`group_${i}_name`] && "border-destructive focus-visible:ring-destructive")} value={formData.group[i]?.name || ""} onChange={e => {
                            const newGroup = [...formData.group];
                            if (!newGroup[i]) newGroup[i] = { name: "", passport: "", phone: "", email: "", countryCode: "GB" };
                            newGroup[i].name = e.target.value;
                            setFormData({ ...formData, group: newGroup });
                            if (errors[`group_${i}_name`]) {
                              const newErrors = { ...errors };
                              delete newErrors[`group_${i}_name`];
                              setErrors(newErrors);
                            }
                          }} />
                          {errors[`group_${i}_name`] && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Required</div>}
                        </div>
                        <div className="space-y-1">
                          <Label className={cn("text-xs", errors[`group_${i}_passport`] && "text-destructive")}>Passport {mode === "confirmed" && "*"}</Label>
                          <Input className={cn("h-8 text-sm", errors[`group_${i}_passport`] && "border-destructive focus-visible:ring-destructive")} value={formData.group[i]?.passport || ""} onChange={e => {
                            const newGroup = [...formData.group];
                            if (!newGroup[i]) newGroup[i] = { name: "", passport: "", phone: "", email: "", countryCode: "GB" };
                            newGroup[i].passport = e.target.value;
                            setFormData({ ...formData, group: newGroup });
                            if (errors[`group_${i}_passport`]) {
                              const newErrors = { ...errors };
                              delete newErrors[`group_${i}_passport`];
                              setErrors(newErrors);
                            }
                          }} />
                          {errors[`group_${i}_passport`] && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors[`group_${i}_passport`]}</div>}
                        </div>
                        <div className="space-y-1">
                          <Label className={cn("text-xs", errors[`group_${i}_phone`] && "text-destructive")}>
                            Phone {mode === "confirmed" && "*"}
                          </Label>
                          <div className="flex gap-0">
                            <Popover
                              open={!!memberPopoverOpen[i]}
                              onOpenChange={(isOpen) => setMemberPopoverOpen(prev => ({ ...prev, [i]: isOpen }))}
                            >
                              <PopoverTrigger asChild>
                                <button
                                  type="button"
                                  className={cn(
                                    "flex items-center gap-1 h-8 px-2 rounded-l-md border border-r-0 border-input bg-muted/50 hover:bg-muted text-[11px] shrink-0 cursor-pointer",
                                    errors[`group_${i}_phone`] && "border-destructive"
                                  )}
                                >
                                  <img
                                    src={`https://flagcdn.com/w20/${(COUNTRIES.find(c => c.code === (formData.group[i]?.countryCode || "GB")) || COUNTRIES[0]).code.toLowerCase()}.png`}
                                    width="14"
                                    height="10"
                                    alt=""
                                    className="object-contain shrink-0"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = "none";
                                    }}
                                  />
                                  <span className="font-medium text-foreground">
                                    {(COUNTRIES.find(c => c.code === (formData.group[i]?.countryCode || "GB")) || COUNTRIES[0]).dialCode}
                                  </span>
                                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="p-0 w-[260px] flex flex-col z-[100] bg-card border border-border rounded-md shadow-md" align="start">
                                <div className="p-2 border-b border-border">
                                  <Input
                                    placeholder="Search country..."
                                    value={memberSearchQuery[i] || ""}
                                    onChange={(e) => setMemberSearchQuery(prev => ({ ...prev, [i]: e.target.value }))}
                                    className="h-8 text-xs"
                                    autoFocus
                                  />
                                </div>
                                <div className="overflow-y-auto flex-1 max-h-[200px] py-1" style={{ scrollbarWidth: 'thin' }} onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
                                  {COUNTRIES.filter(c =>
                                    c.name.toLowerCase().includes((memberSearchQuery[i] || "").toLowerCase()) ||
                                    c.dialCode.includes(memberSearchQuery[i] || "") ||
                                    c.code.toLowerCase().includes((memberSearchQuery[i] || "").toLowerCase())
                                  ).map((c) => (
                                    <button
                                      key={c.code}
                                      type="button"
                                      onClick={() => {
                                        const newGroup = [...formData.group];
                                        if (!newGroup[i]) newGroup[i] = { name: "", passport: "", phone: "", email: "", countryCode: "GB" };
                                        newGroup[i].countryCode = c.code;
                                        setFormData({ ...formData, group: newGroup });
                                        setMemberPopoverOpen(prev => ({ ...prev, [i]: false }));
                                        setMemberSearchQuery(prev => ({ ...prev, [i]: "" }));
                                        if (errors[`group_${i}_phone`]) {
                                          const newErrors = { ...errors };
                                          delete newErrors[`group_${i}_phone`];
                                          setErrors(newErrors);
                                        }
                                      }}
                                      className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 rounded-sm cursor-pointer"
                                    >
                                      <img
                                        src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                                        width="16"
                                        height="12"
                                        alt=""
                                        className="object-contain shrink-0"
                                        onError={(e) => {
                                          (e.target as HTMLElement).style.display = "none";
                                        }}
                                      />
                                      <span className="font-semibold text-slate-700 dark:text-slate-300">{c.dialCode}</span>
                                      <span className="text-slate-500 truncate">{c.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </PopoverContent>
                            </Popover>
                            <Input
                              className={cn(
                                "h-8 text-sm rounded-l-none",
                                errors[`group_${i}_phone`] && "border-destructive focus-visible:ring-destructive"
                              )}
                              value={formData.group[i]?.phone || ""}
                              onChange={e => {
                                const newGroup = [...formData.group];
                                if (!newGroup[i]) newGroup[i] = { name: "", passport: "", phone: "", email: "", countryCode: "GB" };
                                newGroup[i].phone = e.target.value;
                                setFormData({ ...formData, group: newGroup });
                                if (errors[`group_${i}_phone`]) {
                                  const newErrors = { ...errors };
                                  delete newErrors[`group_${i}_phone`];
                                  setErrors(newErrors);
                                }
                              }}
                              placeholder={`e.g. ${(COUNTRIES.find(c => c.code === (formData.group[i]?.countryCode || "GB")) || COUNTRIES[0]).placeholder}`}
                            />
                          </div>
                          {errors[`group_${i}_phone`] && <div className="text-[10px] text-destructive flex items-center gap-1 mt-0.5"><AlertCircle className="h-3 w-3" /> {errors[`group_${i}_phone`]}</div>}
                        </div>
                        <div className="space-y-1">
                          <Label className={cn("text-xs", errors[`group_${i}_email`] && "text-destructive")}>
                            Email {mode === "confirmed" && "*"}
                          </Label>
                          <Input
                            className={cn(
                              "h-8 text-sm",
                              errors[`group_${i}_email`] && "border-destructive focus-visible:ring-destructive"
                            )}
                            value={formData.group[i]?.email || ""}
                            onChange={e => {
                              const newGroup = [...formData.group];
                              if (!newGroup[i]) newGroup[i] = { name: "", passport: "", phone: "", email: "", countryCode: "GB" };
                              newGroup[i].email = e.target.value;
                              setFormData({ ...formData, group: newGroup });
                              if (errors[`group_${i}_email`]) {
                                const newErrors = { ...errors };
                                delete newErrors[`group_${i}_email`];
                                setErrors(newErrors);
                              }
                            }}
                            placeholder="john@example.com"
                          />
                          {errors[`group_${i}_email`] && <div className="text-[10px] text-destructive flex items-center gap-1 mt-0.5"><AlertCircle className="h-3 w-3" /> {errors[`group_${i}_email`]}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <FileText className="h-4 w-4" />
                Itinerary Builder
              </h3>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="z-[200]">
                        <p className="text-xs max-w-[200px] text-center">Manually build the itinerary day by day by filling out the details.</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TabsTrigger value="text">Auto (Text)</TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="z-[200]">
                        <p className="text-xs max-w-[200px] text-center">Generate the itinerary automatically from rough text notes using AI.</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TabsTrigger value="pdf">Auto (PDF)</TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="z-[200]">
                        <p className="text-xs max-w-[200px] text-center">Extract the itinerary automatically from an uploaded PDF document using AI.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TabsList>

                <TabsContent value="manual" className="pt-4 space-y-4">
                  {itinerary.map((day, i) => (
                    <div key={i} className="border border-border p-4 rounded-md space-y-3 bg-accent/20 relative">
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => {
                        const updated = [...itinerary];
                        updated.splice(i, 1);
                        setItinerary(updated);
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Day {day.day}</h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Title</Label>
                          <Input className="h-8 text-sm" value={day.title} onChange={e => {
                            const updated = [...itinerary]; updated[i].title = e.target.value; setItinerary(updated);
                          }} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Hotel</Label>
                            <Input className="h-8 text-sm" list="hotels-list" value={day.hotel} onChange={e => {
                              const val = e.target.value;
                              const updated = [...itinerary];
                              updated[i].hotel = val;

                              // Auto-fill email if a match is found
                              const matched = hotels.find(h => h.hotel_name === val);
                              if (matched && matched.hotel_email) {
                                updated[i].hotelEmail = matched.hotel_email;
                              }

                              setItinerary(updated);
                            }} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Hotel Email</Label>
                            <Input className="h-8 text-sm" value={day.hotelEmail} onChange={e => {
                              const updated = [...itinerary]; updated[i].hotelEmail = e.target.value; setItinerary(updated);
                            }} />
                          </div>
                        </div>
                        {(day.hotel && day.hotelEmail) && (
                          <div className="pt-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1.5 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 w-full sm:w-auto">
                                  <Send className="h-3 w-3" />
                                  Send Booking Request
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Auto-Generated Booking Request</DialogTitle>
                                  <DialogDescription>Draft a new booking email to {day.hotel}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-2">
                                  <div className="grid gap-2">
                                    <Label>From</Label>
                                    <Input disabled defaultValue="info@ceylonsignaturetravels.com" />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label>To</Label>
                                    <Input disabled value={day.hotelEmail || "No email provided"} />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`subject-${i}`}>Subject</Label>
                                    <Input id={`subject-${i}`} defaultValue={`New Booking Request - ${formData.name || "Client"} (Pax: ${formData.pax})`} />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`message-${i}`}>Message</Label>
                                    <textarea
                                      id={`message-${i}`}
                                      className="flex min-h-[160px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                      defaultValue={`Dear Reservation Team at ${day.hotel},\n\nWe would like to request a new booking for our client, ${formData.name || "Client Name"} (Group Size: ${formData.pax}), arriving for Day ${day.day} of their tour.\n\nPlease check your availability for these dates and provide us with a quotation.\n\nWe look forward to hearing from you soon.\n\nBest regards,\nCeylon Signature Travels`}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Send Booking Request</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 pt-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Destinations & Activities</Label>

                        {(day.destinations || []).map((dest: any, destIndex: number) => (
                          <div key={`dest-${destIndex}`} className="border border-border rounded-lg bg-background relative">
                            {/* Remove location button */}
                            <Button
                              variant="ghost" size="icon"
                              className="absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full bg-background border border-border text-muted-foreground hover:text-destructive hover:border-destructive z-10"
                              onClick={() => {
                                const updated = [...itinerary];
                                updated[i].destinations.splice(destIndex, 1);
                                setItinerary(updated);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>

                            {/* Location name */}
                            <div className="px-3 pt-3 pb-2 border-b border-border">
                              <Input
                                className="h-8 text-sm font-semibold border-0 p-0 focus-visible:ring-0 bg-transparent"
                                placeholder="Location name (e.g. Sigiriya Rock)"
                                value={dest.location}
                                onChange={e => {
                                  const updated = [...itinerary];
                                  updated[i].destinations[destIndex].location = e.target.value;
                                  setItinerary(updated);
                                }}
                              />
                            </div>

                            {/* Activities list */}
                            <div className="px-3 pt-2 pb-1 space-y-1.5">
                              {(Array.isArray(dest.activities) ? dest.activities : (dest.activities ? [dest.activities] : [])).map((act: string, actIdx: number) => (
                                <div key={actIdx} className="flex items-center gap-1.5">
                                  <span className="text-muted-foreground text-xs mt-0.5">•</span>
                                  <Input
                                    autoFocus={act === ""}
                                    className="h-7 text-xs flex-1 bg-muted/30"
                                    placeholder="Activity description..."
                                    value={act}
                                    onChange={e => {
                                      const updated = [...itinerary];
                                      const acts = Array.isArray(updated[i].destinations[destIndex].activities)
                                        ? [...updated[i].destinations[destIndex].activities]
                                        : (updated[i].destinations[destIndex].activities ? [updated[i].destinations[destIndex].activities] : []);
                                      acts[actIdx] = e.target.value;
                                      updated[i].destinations[destIndex].activities = acts;
                                      setItinerary(updated);
                                    }}
                                  />
                                  <Button
                                    variant="ghost" size="icon"
                                    className="h-5 w-5 shrink-0 text-muted-foreground hover:text-destructive"
                                    onClick={() => {
                                      const updated = [...itinerary];
                                      const acts = Array.isArray(updated[i].destinations[destIndex].activities)
                                        ? [...updated[i].destinations[destIndex].activities]
                                        : [];
                                      acts.splice(actIdx, 1);
                                      updated[i].destinations[destIndex].activities = acts;
                                      setItinerary(updated);
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}

                              {/* Add Activity under THIS location */}
                              <Button
                                variant="ghost" size="sm"
                                className="h-6 text-xs gap-1 text-muted-foreground hover:text-foreground px-1 mt-1"
                                onClick={() => {
                                  const updated = [...itinerary];
                                  const acts = Array.isArray(updated[i].destinations[destIndex].activities)
                                    ? [...updated[i].destinations[destIndex].activities]
                                    : (updated[i].destinations[destIndex].activities ? [updated[i].destinations[destIndex].activities] : []);
                                  acts.push("");
                                  updated[i].destinations[destIndex].activities = acts;
                                  setItinerary(updated);
                                }}
                              >
                                <Plus className="h-3 w-3" /> Add Activity
                              </Button>
                            </div>
                          </div>
                        ))}

                        {/* Add new Location */}
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5" onClick={() => {
                          const updated = [...itinerary];
                          if (!updated[i].destinations) updated[i].destinations = [];
                          updated[i].destinations.push({ location: "", activities: [] });
                          setItinerary(updated);
                        }}>
                          <Plus className="h-3 w-3" /> Add Location
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full gap-2 border-dashed" onClick={() => setItinerary([...itinerary, { day: itinerary.length + 1, title: "", hotel: "", hotelEmail: "", destinations: [{ location: "", activities: "" }] }])}>
                    <Plus className="h-4 w-4" />
                    Add Day
                  </Button>

                  {itinerary.length > 0 && (
                    <div className="pt-2">
                      <Button
                        variant="default"
                        className="w-full gap-2 bg-primary/90 hover:bg-primary"
                        onClick={() => handleGenerate('manual_pdf')}
                        disabled={isGenerating}
                      >
                        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                        {isGenerating ? "Generating PDF..." : "Download Graphical PDF"}
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="text" className="pt-4 space-y-4">
                  <div className="text-sm text-muted-foreground">Paste rough itinerary notes or chat logs below. AI will extract the days, hotels, and locations.</div>
                  <Textarea
                    placeholder="E.g. They arrive on the 24th and stay at Galle Face Hotel. Next day they go to Dambulla and stay at Kandalama..."
                    className="min-h-[150px]"
                    value={itineraryText}
                    onChange={e => setItineraryText(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    onClick={() => handleGenerate('text')}
                    disabled={isGenerating || !itineraryText.trim()}
                  >
                    {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : "Generate Itinerary"}
                  </Button>
                </TabsContent>

                <TabsContent value="pdf" className="pt-4 space-y-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setPdfFile(file);
                    }}
                  />
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center space-y-3 transition-colors cursor-pointer",
                      pdfFile ? "border-primary bg-primary/5" : "border-border hover:bg-accent/30"
                    )}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const file = e.dataTransfer.files?.[0];
                      if (file && file.name.toLowerCase().endsWith(".pdf")) {
                        setPdfFile(file);
                      } else {
                        alert("Please drop a PDF file.");
                      }
                    }}
                  >
                    <div className={cn("p-3 rounded-full", pdfFile ? "bg-primary/20" : "bg-primary/10")}>
                      <UploadCloud className={cn("h-6 w-6", pdfFile ? "text-primary" : "text-primary")} />
                    </div>
                    <div>
                      {pdfFile ? (
                        <>
                          <p className="text-sm font-medium text-primary">{pdfFile.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{(pdfFile.size / 1024).toFixed(0)} KB — Click to change</p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF itineraries (max 20MB)</p>
                        </>
                      )}
                    </div>
                  </div>

                  {isGenerating && (
                    <div className="space-y-2 pb-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{uploadProgress < 100 ? "Analyzing itinerary..." : "Complete!"}</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  <Button
                    className="w-full"
                    onClick={() => handleGenerate('pdf')}
                    disabled={isGenerating || !pdfFile}
                  >
                    {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Upload & Extract"}
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="px-6 py-4 border-t border-border bg-card">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button onClick={handleSave}>Save Client</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
