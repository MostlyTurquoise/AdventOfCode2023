ECHO OFF
mkdir day%1
cd day%1
echo import fs from 'fs'; >> ./index.ts
echo import Day from '../helpFiles/export.js'; >> ./index.ts
echo[ >> ./index.ts
echo export default new Day(%2,%1,); >> ./index.ts
