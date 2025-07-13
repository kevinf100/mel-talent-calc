import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory for the actual project
const targetDir = path.join(__dirname, 'src', 'core', 'data');

// Get all class directories
function getClassDirs() {
    try {
        return fs.readdirSync(targetDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    } catch (error) {
        console.error(`❌ Error reading target directory: ${targetDir}`);
        console.error(error.message);
        return [];
    }
}

function fixLineBreaks() {
    console.log('🔧 FIXING LINE BREAKS');
    console.log(`📁 Target directory: ${targetDir}`);
    console.log('Converting \\\\n to actual newline characters in strings\n');
    console.log('='.repeat(60));

    const classDirs = getClassDirs();
    if (classDirs.length === 0) {
        console.log('❌ No class directories found!');
        return;
    }

    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let totalReplacements = 0;

    classDirs.forEach(className => {
        const classDir = path.join(targetDir, className);

        // Get all spec files (non-raw files)
        let specFiles;
        try {
            specFiles = fs.readdirSync(classDir)
                .filter(file => file.endsWith('.ts') && !file.startsWith('raw_'));
        } catch (error) {
            console.log(`❌ Error reading ${className} directory: ${error.message}`);
            errorCount++;
            return;
        }

        if (specFiles.length === 0) {
            return;
        }

        console.log(`\n${className.toUpperCase()}:`);

        specFiles.forEach(specFile => {
            const specName = specFile.replace('.ts', '');
            const specFilePath = path.join(classDir, specFile);

            try {
                // Read the existing TS file
                const originalContent = fs.readFileSync(specFilePath, 'utf8');
                
                // Check if it contains \n sequences in strings
                const hasEscapedNewlines = originalContent.includes('\\n');
                
                if (!hasEscapedNewlines) {
                    console.log(`  ✅ ${specName}: No escaped newlines found`);
                    skippedCount++;
                    return;
                }

                // Count replacements for this file
                const nlMatches = originalContent.match(/\\n/g) || [];
                const fileReplacements = nlMatches.length;
                
                // Replace \n with actual newline characters within strings
                // This handles the case where we have "text\nmore text" and converts to actual newlines
                let updatedContent = originalContent.replace(/\\n/g, '\n');

                // Write the updated file
                fs.writeFileSync(specFilePath, updatedContent);
                
                console.log(`  🔧 ${specName}: Fixed ${fileReplacements} line break(s)`);
                updatedCount++;
                totalReplacements += fileReplacements;

            } catch (error) {
                console.log(`  ❌ ${specName}: Error - ${error.message}`);
                errorCount++;
            }
        });
    });

    console.log('\n' + '='.repeat(60));
    console.log('📊 UPDATE SUMMARY:');
    console.log(`🔧 Files updated: ${updatedCount}`);
    console.log(`✅ Files with no issues: ${skippedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total line breaks fixed: ${totalReplacements}`);
    console.log('='.repeat(60));
    
    if (updatedCount > 0) {
        console.log('\n🚀 SUCCESS: Line breaks fixed!');
        console.log('💡 Strings now contain actual newline characters instead of \\\\n');
    }
}

// Execute the fix
fixLineBreaks();
