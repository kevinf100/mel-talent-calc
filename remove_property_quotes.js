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

function removePropertyQuotes() {
    console.log('🔄 REMOVING QUOTES FROM PROPERTY NAMES');
    console.log(`📁 Target directory: ${targetDir}`);
    console.log('Converting from JSON-style to JavaScript object notation\n');
    console.log('='.repeat(60));

    const classDirs = getClassDirs();
    if (classDirs.length === 0) {
        console.log('❌ No class directories found!');
        return;
    }

    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

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
                
                // Check if it already uses unquoted property names (like warrior files)
                const hasQuotedProps = originalContent.includes('"specIcon":') || 
                                      originalContent.includes('"name":') ||
                                      originalContent.includes('"talents":');
                
                if (!hasQuotedProps) {
                    console.log(`  ✅ ${specName}: Already uses unquoted property names`);
                    skippedCount++;
                    return;
                }

                // Remove quotes from property names
                // This regex matches "propertyName": and converts to propertyName:
                let updatedContent = originalContent.replace(/"([a-zA-Z_][a-zA-Z0-9_]*)"\s*:/g, '$1:');

                // Write the updated file
                fs.writeFileSync(specFilePath, updatedContent);
                
                console.log(`  🔄 ${specName}: Removed quotes from property names`);
                updatedCount++;

            } catch (error) {
                console.log(`  ❌ ${specName}: Error - ${error.message}`);
                errorCount++;
            }
        });
    });

    console.log('\n' + '='.repeat(60));
    console.log('📊 UPDATE SUMMARY:');
    console.log(`🔄 Files updated: ${updatedCount}`);
    console.log(`✅ Files already correct: ${skippedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('='.repeat(60));
    
    if (updatedCount > 0) {
        console.log('\n🚀 SUCCESS: Property quotes removed!');
        console.log('💡 All files now use JavaScript object notation instead of JSON');
    }
}

// Execute the update
removePropertyQuotes();
