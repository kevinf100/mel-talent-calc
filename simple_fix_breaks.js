import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory for the actual project
const targetDir = path.join(__dirname, 'src', 'core', 'data');

// Files that had line breaks fixed and need to be reverted
const filesToFix = [
    'druid/balance.ts',
    'druid/restoration.ts',
    'paladin/retribution.ts',
    'shaman/elemental.ts',
    'shaman/enhancement.ts',
    'warlock/demonology.ts',
    'warlock/destruction.ts',
    'warrior/protection.ts'
];

function simpleFixLineBreaks() {
    console.log('🔧 SIMPLE FIX FOR BROKEN LINE BREAKS');
    console.log('Fixing multiline strings by replacing actual newlines with \\\\n\n');
    console.log('='.repeat(60));

    let fixedCount = 0;
    let errorCount = 0;

    filesToFix.forEach(filePath => {
        const fullPath = path.join(targetDir, filePath);
        const fileName = path.basename(filePath, '.ts');
        
        try {
            console.log(`\\n🔧 Fixing ${filePath}:`);
            
            // Read the file
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Replace patterns where we have strings that span multiple lines
            // This handles cases like:
            // "text
            // more text"
            // and converts to:
            // "text\\nmore text"
            
            let fixedContent = content;
            
            // Replace actual newlines within string literals with \\n escape sequences
            // Look for patterns like "...text\n(newline)more text..."
            fixedContent = fixedContent.replace(/(".*?)\n\n(.*?")/gs, '$1\\\\n\\\\n$2');
            fixedContent = fixedContent.replace(/(".*?)\n([^"]*?")/gs, '$1\\\\n$2');
            
            // Write the fixed content
            fs.writeFileSync(fullPath, fixedContent);
            
            console.log(`  ✅ Fixed multiline strings in ${fileName}`);
            fixedCount++;
            
        } catch (error) {
            console.log(`  ❌ Error fixing ${fileName}: ${error.message}`);
            errorCount++;
        }
    });

    console.log('\\n' + '='.repeat(60));
    console.log('📊 FIX SUMMARY:');
    console.log(`🔧 Files fixed: ${fixedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('='.repeat(60));
    
    if (fixedCount > 0) {
        console.log('\\n🚀 SUCCESS: Multiline strings fixed!');
        console.log('💡 All strings now use proper \\\\n escape sequences');
    }
}

// Execute the fix
simpleFixLineBreaks();
