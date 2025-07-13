import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory for the actual project
const targetDir = path.join(__dirname, 'src', 'core', 'data');

// Files with known issues
const filesToFix = [
    'shaman/elemental.ts',
    'warlock/demonology.ts', 
    'warlock/destruction.ts',
    'warrior/protection.ts'
];

function fixSpecificBreaks() {
    console.log('🔧 FIXING SPECIFIC MULTILINE STRING BREAKS\n');
    
    let totalFixed = 0;
    
    filesToFix.forEach(relativePath => {
        const filePath = path.join(targetDir, relativePath);
        
        try {
            console.log(`🔧 Fixing ${relativePath}...`);
            
            // Read the file
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Fix multiline strings by joining lines that are part of the same string
            const lines = content.split('\n');
            const fixedLines = [];
            let i = 0;
            
            while (i < lines.length) {
                const line = lines[i];
                const trimmed = line.trim();
                
                // Check if this line starts a multiline string
                if (trimmed.startsWith('"') && !trimmed.endsWith('",') && !trimmed.endsWith('"')) {
                    // This is the start of a multiline string
                    let fullString = line;
                    i++;
                    
                    // Keep adding lines until we find the closing quote
                    while (i < lines.length) {
                        const nextLine = lines[i];
                        const nextTrimmed = nextLine.trim();
                        
                        if (nextTrimmed === '') {
                            // Empty line - add as \\n\\n
                            fullString += '\\n\\n';
                        } else if (nextTrimmed.endsWith('"')) {
                            // This is the end of the string
                            fullString += '\\n' + nextTrimmed;
                            break;
                        } else {
                            // Middle line - add with \\n
                            fullString += '\\n' + nextTrimmed;
                        }
                        i++;
                    }
                    
                    fixedLines.push(fullString);
                    totalFixed++;
                } else {
                    // Normal line
                    fixedLines.push(line);
                }
                i++;
            }
            
            // Write the fixed content
            const fixedContent = fixedLines.join('\n');
            fs.writeFileSync(filePath, fixedContent);
            
            console.log(`  ✅ Fixed ${relativePath}`);
            
        } catch (error) {
            console.log(`  ❌ Error fixing ${relativePath}: ${error.message}`);
        }
    });
    
    console.log(`\n🚀 Successfully fixed ${totalFixed} multiline strings!`);
    console.log('💡 All strings now use proper \\n escape sequences');
}

// Execute the fix
fixSpecificBreaks();
